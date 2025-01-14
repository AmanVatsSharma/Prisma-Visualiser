import type { PrismaModel, PrismaField, Relationship } from '../store/schema-store'
import type { PrismaModelAttribute } from '../types/prisma-types'

/**
 * Formats a model attribute into Prisma schema syntax
 */
function formatAttribute(attr: PrismaModelAttribute): string {
  if (attr.value) {
    return `@${attr.name}(${attr.value})`
  }
  return `@${attr.name}`
}

/**
 * Formats field attributes into Prisma schema syntax
 */
function formatFieldAttributes(attributes: string[]): string {
  if (!attributes.length) return ''
  return ' ' + attributes.map(attr => `@${attr}`).join(' ')
}

/**
 * Generates the field type declaration including modifiers
 */
function formatFieldType(field: PrismaField): string {
  let type = field.type
  if (field.isList) {
    type = `${type}[]`
  }
  if (field.isRequired && !field.isList) {
    return type
  }
  return `${type}?`
}

/**
 * Generates relationship field declarations for a model
 */
function generateRelationFields(
  modelId: string,
  relationships: Relationship[]
): string[] {
  const fields: string[] = []

  // Get relationships where this model is the source
  const outgoingRelations = relationships.filter(rel => rel.fromModel === modelId)
  for (const rel of outgoingRelations) {
    // Find the target model name
    const targetModel = rel.toModel
    
    // Generate the relation field
    const fieldDeclarations = rel.config.fields.map(field => {
      const attributes = []
      
      // Add relation attribute
      attributes.push(`@relation(fields: [${field.fieldName}], references: [${field.referencedField}]`)
      
      // Add any referential actions
      if (rel.config.onDelete) {
        attributes.push(`onDelete: ${rel.config.onDelete}`)
      }
      if (rel.config.onUpdate) {
        attributes.push(`onUpdate: ${rel.config.onUpdate}`)
      }
      attributes[0] += ')'
      
      // Generate the field declaration
      const isRequired = rel.type !== 'MANY_TO_MANY'
      const isList = rel.type === 'ONE_TO_MANY' || rel.type === 'MANY_TO_MANY'
      
      return `  ${targetModel}${isList ? '[]' : isRequired ? '' : '?'} ${attributes.join(' ')}`
    })
    
    fields.push(...fieldDeclarations)
  }

  // Get relationships where this model is the target
  const incomingRelations = relationships.filter(rel => rel.toModel === modelId)
  for (const rel of incomingRelations) {
    // Find the source model name
    const sourceModel = rel.fromModel
    
    // For many-to-many, add the reverse relation
    if (rel.type === 'MANY_TO_MANY') {
      fields.push(`  ${sourceModel}[] @relation("${rel.id}")`)
    }
  }

  return fields
}

/**
 * Generates a complete Prisma model declaration
 */
function generateModel(
  model: PrismaModel,
  relationships: Relationship[]
): string {
  const lines: string[] = []

  // Add model attributes
  if (model.attributes.length > 0) {
    lines.push(...model.attributes.map(attr => formatAttribute(attr)))
  }

  // Start model declaration
  lines.push(`model ${model.name} {`)

  // Add fields
  for (const field of model.fields) {
    const type = formatFieldType(field)
    const attributes = formatFieldAttributes(field.attributes)
    lines.push(`  ${field.name} ${type}${attributes}`)
  }

  // Add relationship fields
  const relationFields = generateRelationFields(model.id, relationships)
  if (relationFields.length > 0) {
    if (model.fields.length > 0) {
      lines.push('')  // Add spacing between regular fields and relations
    }
    lines.push(...relationFields)
  }

  lines.push('}')
  return lines.join('\n')
}

/**
 * Generates the complete Prisma schema
 */
export function generateSchema(
  models: PrismaModel[],
  relationships: Relationship[]
): string {
  const lines: string[] = []

  // Add datasource block
  lines.push('datasource db {')
  lines.push('  provider = "postgresql"')
  lines.push('  url      = env("DATABASE_URL")')
  lines.push('}')
  lines.push('')

  // Add generator block
  lines.push('generator client {')
  lines.push('  provider = "prisma-client-js"')
  lines.push('}')
  lines.push('')

  // Generate each model
  for (const model of models) {
    if (lines.length > 0) {
      lines.push('')  // Add spacing between models
    }
    lines.push(generateModel(model, relationships))
  }

  return lines.join('\n')
} 