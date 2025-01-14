export const PRISMA_SCALAR_TYPES = [
  'String',
  'Int',
  'Float',
  'Boolean',
  'DateTime',
  'BigInt',
  'Decimal',
  'Json',
  'Bytes',
] as const

export const PRISMA_FIELD_ATTRIBUTES = [
  'id',
  'unique',
  'default',
  'map',
  'updatedAt',
  '@db.Text',
  '@db.VarChar',
] as const

export const MODEL_ATTRIBUTE_NAMES = [
  '@@map',
  '@@id',
  '@@unique',
  '@@index',
  '@@fulltext',
  '@@ignore',
] as const

export const PRISMA_MODEL_ATTRIBUTES = [
  {
    name: '@@map' as const,
    description: 'Map model to a different table name',
    requiresValue: true,
  },
  {
    name: '@@id' as const,
    description: 'Define composite ID',
    requiresValue: true,
  },
  {
    name: '@@unique' as const,
    description: 'Define composite unique constraint',
    requiresValue: true,
  },
  {
    name: '@@index' as const,
    description: 'Define database index',
    requiresValue: true,
  },
  {
    name: '@@fulltext' as const,
    description: 'Define full-text search index',
    requiresValue: true,
  },
  {
    name: '@@ignore' as const,
    description: 'Ignore model in SQL schema',
    requiresValue: false,
  },
] as const

export type PrismaScalarType = typeof PRISMA_SCALAR_TYPES[number]
export type PrismaFieldAttribute = typeof PRISMA_FIELD_ATTRIBUTES[number]
export type ModelAttributeName = typeof MODEL_ATTRIBUTE_NAMES[number]

export interface PrismaModelAttribute {
  name: ModelAttributeName
  value?: string
}

export interface PrismaTypeOption {
  label: string
  value: PrismaScalarType
  description: string
}

export const PRISMA_TYPE_OPTIONS: PrismaTypeOption[] = [
  {
    label: 'String',
    value: 'String',
    description: 'Text values',
  },
  {
    label: 'Int',
    value: 'Int',
    description: 'Integer numbers',
  },
  {
    label: 'Float',
    value: 'Float',
    description: 'Decimal numbers',
  },
  {
    label: 'Boolean',
    value: 'Boolean',
    description: 'True/false values',
  },
  {
    label: 'DateTime',
    value: 'DateTime',
    description: 'Date and time values',
  },
  {
    label: 'BigInt',
    value: 'BigInt',
    description: 'Large integer numbers',
  },
  {
    label: 'Decimal',
    value: 'Decimal',
    description: 'Precise decimal numbers',
  },
  {
    label: 'Json',
    value: 'Json',
    description: 'JSON data',
  },
  {
    label: 'Bytes',
    value: 'Bytes',
    description: 'Binary data',
  },
] 