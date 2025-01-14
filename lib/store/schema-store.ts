import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RelationType, RelationConfig } from '@/lib/types/relationship-types'
import type { PrismaModelAttribute } from '@/lib/types/prisma-types'

export interface PrismaField {
  name: string
  type: string
  isRequired: boolean
  isList: boolean
  attributes: string[]
  defaultValue?: string | number | boolean | null
}

export interface PrismaModel {
  id: string
  name: string
  attributes: PrismaModelAttribute[]
  fields: PrismaField[]
}

export interface Relationship {
  id: string
  fromModel: string
  toModel: string
  type: RelationType
  config: RelationConfig
}

interface SchemaState {
  models: PrismaModel[]
  relationships: Relationship[]
  addModel: (model: Omit<PrismaModel, 'id'>) => void
  updateModel: (id: string, model: Partial<PrismaModel>) => void
  deleteModel: (id: string) => void
  addRelationship: (relationship: Omit<Relationship, 'id'>) => void
  updateRelationship: (id: string, relationship: Partial<Relationship>) => void
  deleteRelationship: (id: string) => void
}

export const useSchemaStore = create<SchemaState>()(
  persist(
    (set) => ({
      models: [],
      relationships: [],
      
      addModel: (model) =>
        set((state) => ({
          models: [...state.models, { ...model, id: crypto.randomUUID() }],
        })),
        
      updateModel: (id, model) =>
        set((state) => ({
          models: state.models.map((m) =>
            m.id === id ? { ...m, ...model } : m
          ),
        })),
        
      deleteModel: (id) =>
        set((state) => ({
          models: state.models.filter((m) => m.id !== id),
          relationships: state.relationships.filter(
            (r) => r.fromModel !== id && r.toModel !== id
          ),
        })),
        
      addRelationship: (relationship) =>
        set((state) => ({
          relationships: [
            ...state.relationships,
            { ...relationship, id: crypto.randomUUID() },
          ],
        })),
        
      updateRelationship: (id, relationship) =>
        set((state) => ({
          relationships: state.relationships.map((r) =>
            r.id === id ? { ...r, ...relationship } : r
          ),
        })),
        
      deleteRelationship: (id) =>
        set((state) => ({
          relationships: state.relationships.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'prisma-schema-storage',
    }
  )
) 