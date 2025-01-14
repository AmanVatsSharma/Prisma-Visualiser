import type { PrismaField, PrismaModel, Relationship } from '@/lib/store/schema-store'
import { PRISMA_MODEL_ATTRIBUTES } from '@/lib/types/prisma-types'
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

  // Validate name
  if (!field.name) {
    errors.push({
      type: 'error',
      message: 'Field name is required',
      field: 'name'
    })
  } else if (!/^[a-z][a-zA-Z]*$/.test(field.name)) {
    errors.push({
      type: 'error',
      message: 'Field name must start with a lowercase letter and contain only letters',
      field: 'name'
    })
  }

  // Validate type
  if (!field.type) {
    errors.push({
      type: 'error',
      message: 'Field type is required',
      field: 'type'
    })
  }

  // Validate default value if present
  if (field.defaultValue !== null) {
    errors.push(...validateDefaultValue(field))
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

  // Validate source and target models
  const fromModel = models.find((m) => m.id === relationship.fromModel)
  const toModel = models.find((m) => m.id === relationship.toModel)

  if (!fromModel) {
    errors.push({
      type: 'error',
      message: 'Source model not found',
      field: 'fromModel',
    })
  }

  if (!toModel) {
    errors.push({
      type: 'error',
      message: 'Target model not found',
      field: 'toModel',
    })
  }

  if (fromModel && toModel) {
    // Warn if source and target are the same
    if (fromModel.id === toModel.id) {
      errors.push({
        type: 'warning',
        message: 'Self-referential relationship detected',
      })
    }

    // Validate field mappings
    if (!relationship.config.fields.length) {
      errors.push({
        type: 'error',
        message: 'At least one field mapping is required',
        field: 'fields',
      })
    } else {
      // Validate each field mapping
      relationship.config.fields.forEach((field, index) => {
        // Check source field exists
        if (!fromModel.fields.some((f) => f.name === field.fieldName)) {
          errors.push({
            type: 'error',
            message: `Field "${field.fieldName}" not found in source model`,
            field: `fields[${index}].fieldName`,
          })
        }

        // Check target field exists
        if (!toModel.fields.some((f) => f.name === field.referencedField)) {
          errors.push({
            type: 'error',
            message: `Field "${field.referencedField}" not found in target model`,
            field: `fields[${index}].referencedField`,
          })
        }
      })

      // Check for duplicate mappings
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
    }
  }

  return errors
}

function validateDefaultValue(field: PrismaField): ValidationError[] {
  const errors: ValidationError[] = []
  
  if (field.defaultValue === null) {
    return errors
  }

  const defaultValueStr = String(field.defaultValue)

  switch (field.type) {
    case 'Int':
    case 'BigInt':
      if (!/^-?\d+$/.test(defaultValueStr)) {
        errors.push({
          type: 'error',
          message: `Default value must be a valid ${field.type}`,
          field: 'defaultValue'
        })
      }
      break
    case 'Float':
    case 'Decimal':
      if (!/^-?\d*\.?\d+$/.test(defaultValueStr)) {
        errors.push({
          type: 'error',
          message: `Default value must be a valid ${field.type}`,
          field: 'defaultValue'
        })
      }
      break
    case 'Boolean':
      if (typeof field.defaultValue !== 'boolean') {
        errors.push({
          type: 'error',
          message: 'Default value must be a boolean',
          field: 'defaultValue'
        })
      }
      break
    case 'DateTime':
      try {
        new Date(defaultValueStr).toISOString()
      } catch {
        errors.push({
          type: 'error',
          message: 'Default value must be a valid date',
          field: 'defaultValue'
        })
      }
      break
  }

  return errors
} 