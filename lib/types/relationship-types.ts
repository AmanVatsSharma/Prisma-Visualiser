export const RELATIONSHIP_TYPES = [
  {
    type: 'ONE_TO_ONE',
    label: 'One-to-One',
    description: 'Each record in model A has exactly one matching record in model B',
    example: 'User ↔ Profile',
  },
  {
    type: 'ONE_TO_MANY',
    label: 'One-to-Many',
    description: 'Each record in model A has many matching records in model B',
    example: 'User → Posts',
  },
  {
    type: 'MANY_TO_MANY',
    label: 'Many-to-Many',
    description: 'Multiple records in model A can match multiple records in model B',
    example: 'Post ↔ Category',
  },
] as const

export const REFERENTIAL_ACTIONS = [
  {
    type: 'CASCADE',
    label: 'Cascade',
    description: 'Delete or update related records',
  },
  {
    type: 'RESTRICT',
    label: 'Restrict',
    description: 'Prevent deletion or update if related records exist',
  },
  {
    type: 'NO_ACTION',
    label: 'No Action',
    description: 'Similar to RESTRICT, but deferred until transaction commit',
  },
  {
    type: 'SET_NULL',
    label: 'Set Null',
    description: 'Set foreign key to NULL',
  },
  {
    type: 'SET_DEFAULT',
    label: 'Set Default',
    description: 'Set foreign key to its default value',
  },
] as const

export type RelationType = typeof RELATIONSHIP_TYPES[number]['type']
export type ReferentialAction = typeof REFERENTIAL_ACTIONS[number]['type']

export interface RelationField {
  fieldName: string
  referencedField: string
}

export interface RelationConfig {
  onDelete?: ReferentialAction
  onUpdate?: ReferentialAction
  fields: RelationField[]
} 