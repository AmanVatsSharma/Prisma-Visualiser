import { useState } from 'react'
import { useSchemaStore } from '@/lib/store/schema-store'
import { RelationshipForm } from './relationship-form'

export function RelationshipList() {
  const models = useSchemaStore((state) => state.models)
  const relationships = useSchemaStore((state) => state.relationships)
  const deleteRelationship = useSchemaStore((state) => state.deleteRelationship)
  const [isCreating, setIsCreating] = useState(false)

  const getModelName = (id: string) => {
    return models.find((m) => m.id === id)?.name ?? 'Unknown Model'
  }

  return (
    <div className="space-y-4">
      {relationships.map((relationship) => (
        <div
          key={relationship.id}
          className="p-4 border rounded-lg hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{getModelName(relationship.fromModel)}</span>
                <span className="text-gray-500">→</span>
                <span className="font-medium">{getModelName(relationship.toModel)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {relationship.type.replace(/_/g, ' ')} Relationship
              </p>
              <div className="mt-2 text-sm">
                <div className="text-gray-600">
                  Fields:{' '}
                  {relationship.config.fields.map((field, index) => (
                    <span key={index} className="text-gray-800">
                      {index > 0 && ', '}
                      {field.fieldName} → {field.referencedField}
                    </span>
                  ))}
                </div>
                <div className="text-gray-600">
                  Actions: onDelete={relationship.config.onDelete?.toLowerCase()},{' '}
                  onUpdate={relationship.config.onUpdate?.toLowerCase()}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteRelationship(relationship.id)}
              className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {isCreating ? (
        <div className="p-4 border rounded-lg">
          <RelationshipForm
            onSubmit={() => setIsCreating(false)}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full p-4 text-sm text-gray-500 border border-dashed rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + Add New Relationship
        </button>
      )}
    </div>
  )
} 