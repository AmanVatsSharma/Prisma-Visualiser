import { useState } from 'react'
import { useSchemaStore } from '@/lib/store/schema-store'
import { ModelForm } from './model-form'

export function ModelList() {
  const models = useSchemaStore((state) => state.models)
  const deleteModel = useSchemaStore((state) => state.deleteModel)
  const [isCreating, setIsCreating] = useState(false)
  const [editingModel, setEditingModel] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {models.map((model) => (
        <div
          key={model.id}
          className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
        >
          {editingModel === model.id ? (
            <ModelForm
              initialModel={model}
              onSubmit={() => setEditingModel(null)}
              onCancel={() => setEditingModel(null)}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{model.name}</h3>
                <p className="text-sm text-gray-500">
                  {model.fields.length} fields
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingModel(model.id)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteModel(model.id)}
                  className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isCreating ? (
        <div className="p-4 border rounded-lg">
          <ModelForm
            onSubmit={() => setIsCreating(false)}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full p-4 text-sm text-gray-500 border border-dashed rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + Add New Model
        </button>
      )}
    </div>
  )
} 