import type { PrismaModel, PrismaField } from '@/lib/store/schema-store'
import type { PrismaModelAttribute } from '@/lib/types/prisma-types'

export interface ValidationError {
  type: 'error' | 'warning'
  message: string
  field?: string
}

export function validateModel(model: PrismaModel): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate model name
  if (!model.name) {
    errors.push({
      type: 'error',
      message: 'Model name is required',
      field: 'name',
    })
  } else if (!/^[A-Z][a-zA-Z]*$/.test(model.name)) {
    errors.push({
      type: 'error',
      message: 'Model name must start with a capital letter and contain only letters',
      field: 'name',
    })
  }

  // Validate fields
  if (model.fields.length === 0) {
    errors.push({
      type: 'warning',
      message: 'Model should have at least one field',
    })
  }

  // Check for duplicate field names
  const fieldNames = new Set<string>()
  model.fields.forEach((field) => {
    if (fieldNames.has(field.name)) {
      errors.push({
        type: 'error',
        message: `Duplicate field name: ${field.name}`,
        field: `fields.${field.name}`,
      })
    }
    fieldNames.add(field.name)
  })

  // Validate each field
  model.fields.forEach((field, index) => {
    const fieldErrors = validateField(field)
    fieldErrors.forEach((error) => {
      errors.push({
        ...error,
        field: `fields[${index}].${error.field}`,
      })
    })
  })

  // Validate model attributes
  model.attributes.forEach((attr, index) => {
    const attrErrors = validateModelAttribute(attr)
    attrErrors.forEach((error) => {
      errors.push({
        ...error,
        field: `attributes[${index}]`,
      })
    })
  })

  return errors
}

export function validateField(field: PrismaField): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate field name
  if (!field.name) {
    errors.push({
      type: 'error',
      message: 'Field name is required',
      field: 'name',
    })
  } else if (!/^[a-z][a-zA-Z]*$/.test(field.name)) {
    errors.push({
      type: 'error',
      message: 'Field name must start with a lowercase letter and contain only letters',
      field: 'name',
    })
  }

  // Check for conflicting attributes
  if (field.attributes.includes('id') && field.attributes.includes('unique')) {
    errors.push({
      type: 'warning',
      message: 'ID fields are automatically unique, no need for @unique attribute',
      field: 'attributes',
    })
  }

  // Validate default value based on type
  if (field.defaultValue !== undefined) {
    switch (field.type) {
      case 'Int':
      case 'BigInt':
        if (!/^-?\d+$/.test(field.defaultValue)) {
          errors.push({
            type: 'error',
            message: `Default value must be a valid ${field.type}`,
            field: 'defaultValue',
          })
        }
        break
      case 'Float':
      case 'Decimal':
        if (!/^-?\d*\.?\d+$/.test(field.defaultValue)) {
          errors.push({
            type: 'error',
            message: `Default value must be a valid ${field.type}`,
            field: 'defaultValue',
          })
        }
        break
      case 'Boolean':
        if (!/^(true|false)$/.test(field.defaultValue)) {
          errors.push({
            type: 'error',
            message: 'Default value must be true or false',
            field: 'defaultValue',
          })
        }
        break
      case 'DateTime':
        if (!Date.parse(field.defaultValue)) {
          errors.push({
            type: 'error',
            message: 'Default value must be a valid date',
            field: 'defaultValue',
          })
        }
        break
    }
  }

  return errors
}

export function validateModelAttribute(attr: PrismaModelAttribute): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate attribute value if required
  const attrDef = PRISMA_MODEL_ATTRIBUTES.find((a) => a.name === attr.name)
  if (attrDef?.requiresValue && !attr.value) {
    errors.push({
      type: 'error',
      message: `${attr.name} requires a value`,
      field: 'value',
    })
  }

  return errors
}

export function validateRelationship(
  relationship: Omit<Relationship, 'id'>,
  models: PrismaModel[]
): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate model selections
  if (!relationship.fromModel) {
    errors.push({
      type: 'error',
      message: 'Source model is required',
      field: 'fromModel',
    })
  }

  if (!relationship.toModel) {
    errors.push({
      type: 'error',
      message: 'Target model is required',
      field: 'toModel',
    })
  }

  if (relationship.fromModel === relationship.toModel) {
    errors.push({
      type: 'warning',
      message: 'Self-referential relationships should be used with caution',
      field: 'toModel',
    })
  }

  // Validate field mappings
  if (!relationship.config.fields.length) {
    errors.push({
      type: 'error',
      message: 'At least one field mapping is required',
      field: 'fields',
    })
  }

  const fromModel = models.find((m) => m.id === relationship.fromModel)
  const toModel = models.find((m) => m.id === relationship.toModel)

  relationship.config.fields.forEach((field, index) => {
    if (!field.fieldName) {
      errors.push({
        type: 'error',
        message: 'Source field is required',
        field: `fields[${index}].fieldName`,
      })
    } else if (fromModel && !fromModel.fields.find((f) => f.name === field.fieldName)) {
      errors.push({
        type: 'error',
        message: `Field "${field.fieldName}" does not exist in source model`,
        field: `fields[${index}].fieldName`,
      })
    }

    if (!field.referencedField) {
      errors.push({
        type: 'error',
        message: 'Target field is required',
        field: `fields[${index}].referencedField`,
      })
    } else if (toModel && !toModel.fields.find((f) => f.name === field.referencedField)) {
      errors.push({
        type: 'error',
        message: `Field "${field.referencedField}" does not exist in target model`,
        field: `fields[${index}].referencedField`,
      })
    }
  })

  // Check for duplicate field mappings
  const fieldMappings = new Set<string>()
  relationship.config.fields.forEach((field, index) => {
    const mapping = `${field.fieldName}:${field.referencedField}`
    if (fieldMappings.has(mapping)) {
      errors.push({
        type: 'error',
        message: 'Duplicate field mapping',
        field: `fields[${index}]`,
      })
    }
    fieldMappings.add(mapping)
  })

  return errors
} 