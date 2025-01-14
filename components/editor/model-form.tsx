import { useState, useEffect } from 'react'
import { useSchemaStore } from '@/lib/store/schema-store'
import type { PrismaModel, PrismaField } from '@/lib/store/schema-store'
import type { PrismaModelAttribute } from '@/lib/types/prisma-types'
import { validateModel, type ValidationError } from '@/lib/utils/validation'
import { FieldForm } from './field-form'
import { ModelAttributes } from './model-attributes'
import { ValidationMessages } from '../ui/validation-messages'

interface ModelFormProps {
  initialModel?: PrismaModel
  onSubmit?: () => void
  onCancel?: () => void
}

export function ModelForm({ initialModel, onSubmit, onCancel }: ModelFormProps) {
  const addModel = useSchemaStore((state) => state.addModel)
  const updateModel = useSchemaStore((state) => state.updateModel)
  
  const [model, setModel] = useState<Omit<PrismaModel, 'id'>>({
    name: initialModel?.name ?? '',
    fields: initialModel?.fields ?? [],
    attributes: initialModel?.attributes ?? [],
  })

  const [isAddingField, setIsAddingField] = useState(false)
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null)
  const [errors, setErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    // Validate on any model change
    const validationErrors = validateModel({
      id: initialModel?.id ?? '',
      ...model,
    })
    setErrors(validationErrors)
  }, [model, initialModel?.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Only submit if there are no errors
    const validationErrors = validateModel({
      id: initialModel?.id ?? '',
      ...model,
    })
    
    if (validationErrors.some((error) => error.type === 'error')) {
      setErrors(validationErrors)
      return
    }

    if (initialModel) {
      updateModel(initialModel.id, model)
    } else {
      addModel(model)
    }
    onSubmit?.()
  }

  const handleAddField = (field: PrismaField) => {
    setModel((prev) => ({
      ...prev,
      fields: [...prev.fields, field],
    }))
    setIsAddingField(false)
  }

  const handleUpdateField = (index: number, field: PrismaField) => {
    setModel((prev) => ({
      ...prev,
      fields: prev.fields.map((f, i) => (i === index ? field : f)),
    }))
    setEditingFieldIndex(null)
  }

  const handleDeleteField = (index: number) => {
    setModel((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }))
  }

  const handleAttributesChange = (attributes: PrismaModelAttribute[]) => {
    setModel((prev) => ({
      ...prev,
      attributes,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <ValidationMessages errors={errors} />
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Model Name
        </label>
        <input
          id="name"
          type="text"
          value={model.name}
          onChange={(e) => setModel({ ...model, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.some((e) => e.field === 'name' && e.type === 'error')
              ? 'border-red-300'
              : ''
          }`}
          placeholder="Enter model name..."
          required
          pattern="^[A-Z][a-zA-Z]*$"
          title="Model name must start with a capital letter and contain only letters"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Model Attributes</h3>
        <ModelAttributes
          attributes={model.attributes}
          onChange={handleAttributesChange}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Fields</h3>
          {!isAddingField && (
            <button
              type="button"
              onClick={() => setIsAddingField(true)}
              className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
            >
              Add Field
            </button>
          )}
        </div>

        <div className="space-y-3">
          {model.fields.map((field, index) => (
            <div
              key={index}
              className={`p-3 border rounded-md hover:border-blue-200 transition-colors ${
                errors.some((e) => e.field?.startsWith(`fields[${index}]`) && e.type === 'error')
                  ? 'border-red-300'
                  : ''
              }`}
            >
              {editingFieldIndex === index ? (
                <FieldForm
                  initialField={field}
                  onSubmit={(updatedField) => handleUpdateField(index, updatedField)}
                  onCancel={() => setEditingFieldIndex(null)}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-gray-500">
                      {field.type}
                      {field.isRequired ? ' (required)' : ' (optional)'}
                      {field.attributes.length > 0 &&
                        ` [${field.attributes.join(', ')}]`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingFieldIndex(index)}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteField(index)}
                      className="px-2 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isAddingField && (
            <div className="p-3 border rounded-md">
              <FieldForm
                onSubmit={handleAddField}
                onCancel={() => setIsAddingField(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 text-sm text-white rounded-md ${
            errors.some((e) => e.type === 'error')
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={errors.some((e) => e.type === 'error')}
        >
          {initialModel ? 'Update' : 'Create'} Model
        </button>
      </div>
    </form>
  )
} 