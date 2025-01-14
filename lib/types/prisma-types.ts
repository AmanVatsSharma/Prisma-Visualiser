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

export const PRISMA_MODEL_ATTRIBUTES = [
  {
    name: '@@map',
    description: 'Map model to a different table name',
    requiresValue: true,
  },
  {
    name: '@@id',
    description: 'Define composite ID',
    requiresValue: true,
  },
  {
    name: '@@unique',
    description: 'Define composite unique constraint',
    requiresValue: true,
  },
  {
    name: '@@index',
    description: 'Define database index',
    requiresValue: true,
  },
  {
    name: '@@fulltext',
    description: 'Define full-text search index',
    requiresValue: true,
  },
  {
    name: '@@ignore',
    description: 'Ignore model in SQL schema',
    requiresValue: false,
  },
] as const

export type PrismaScalarType = typeof PRISMA_SCALAR_TYPES[number]
export type PrismaFieldAttribute = typeof PRISMA_FIELD_ATTRIBUTES[number]
export type PrismaModelAttribute = {
  name: typeof PRISMA_MODEL_ATTRIBUTES[number]['name']
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