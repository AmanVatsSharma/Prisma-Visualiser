import { useState, useEffect } from 'react'
import { useSchemaStore } from '@/lib/store/schema-store'
import { 
  RELATIONSHIP_TYPES, 
  REFERENTIAL_ACTIONS, 
  type RelationConfig,
  type RelationType,
  type ReferentialAction
} from '@/lib/types/relationship-types'
import { validateRelationship, type ValidationError } from '@/lib/utils/validation'
import { ValidationMessages } from '../ui/validation-messages'

interface RelationshipFormProps {
  fromModelId?: string
  onSubmit?: () => void
  onCancel?: () => void
}

export function RelationshipForm({
  fromModelId,
  onSubmit,
  onCancel,
}: RelationshipFormProps) {
  const models = useSchemaStore((state) => state.models)
  const addRelationship = useSchemaStore((state) => state.addRelationship)

  const [relationship, setRelationship] = useState({
    fromModel: fromModelId ?? '',
    toModel: '',
    type: RELATIONSHIP_TYPES[0].type as RelationType,
    config: {
      onDelete: 'CASCADE' as ReferentialAction,
      onUpdate: 'CASCADE' as ReferentialAction,
      fields: [{ fieldName: '', referencedField: '' }],
    } as RelationConfig,
  })

  const [errors, setErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    const validationErrors = validateRelationship(relationship, models)
    setErrors(validationErrors)
  }, [relationship, models])

  const fromModel = models.find((m) => m.id === relationship.fromModel)
  const toModel = models.find((m) => m.id === relationship.toModel)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateRelationship(relationship, models)
    if (validationErrors.some((error) => error.type === 'error')) {
      setErrors(validationErrors)
      return
    }
    addRelationship(relationship)
    onSubmit?.()
  }

  const handleAddField = () => {
    setRelationship((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        fields: [...prev.config.fields, { fieldName: '', referencedField: '' }],
      },
    }))
  }

  const handleRemoveField = (index: number) => {
    setRelationship((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        fields: prev.config.fields.filter((_, i) => i !== index),
      },
    }))
  }

  const handleFieldChange = (
    index: number,
    field: 'fieldName' | 'referencedField',
    value: string
  ) => {
    setRelationship((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        fields: prev.config.fields.map((f, i) =>
          i === index ? { ...f, [field]: value } : f
        ),
      },
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && <ValidationMessages errors={errors} />}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">From Model</label>
            <select
              value={relationship.fromModel}
              onChange={(e) =>
                setRelationship({ ...relationship, fromModel: e.target.value })
              }
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.some((e) => e.field === 'fromModel' && e.type === 'error')
                  ? 'border-red-300'
                  : ''
              }`}
              required
            >
              <option value="">Select a model...</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">To Model</label>
            <select
              value={relationship.toModel}
              onChange={(e) =>
                setRelationship({ ...relationship, toModel: e.target.value })
              }
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.some((e) => e.field === 'toModel' && e.type === 'error')
                  ? 'border-red-300'
                  : ''
              }`}
              required
            >
              <option value="">Select a model...</option>
              {models
                .filter((m) => m.id !== relationship.fromModel)
                .map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Relationship Type</label>
          <div className="mt-1 grid grid-cols-1 gap-2">
            {RELATIONSHIP_TYPES.map((type) => (
              <label
                key={type.type}
                className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                  relationship.type === type.type
                    ? 'border-blue-500 bg-blue-50'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.type}
                  checked={relationship.type === type.type}
                  onChange={(e) =>
                    setRelationship({ ...relationship, type: e.target.value as RelationType })
                  }
                  className="sr-only"
                />
                <div>
                  <div className="font-medium">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                  <div className="text-sm text-gray-400">Example: {type.example}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Field Mapping</label>
            <button
              type="button"
              onClick={handleAddField}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Field
            </button>
          </div>
          <div className="space-y-2">
            {relationship.config.fields.map((field, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <select
                    value={field.fieldName}
                    onChange={(e) =>
                      handleFieldChange(index, 'fieldName', e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  >
                    <option value="">Select field...</option>
                    {fromModel?.fields.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.name} ({f.type})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-shrink-0 pt-2">→</div>
                <div className="flex-1">
                  <select
                    value={field.referencedField}
                    onChange={(e) =>
                      handleFieldChange(index, 'referencedField', e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  >
                    <option value="">Select field...</option>
                    {toModel?.fields.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.name} ({f.type})
                      </option>
                    ))}
                  </select>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="flex-shrink-0 text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">On Delete</label>
            <select
              value={relationship.config.onDelete}
              onChange={(e) =>
                setRelationship({
                  ...relationship,
                  config: {
                    ...relationship.config,
                    onDelete: e.target.value as ReferentialAction,
                  },
                })
              }
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              {REFERENTIAL_ACTIONS.map((action) => (
                <option key={action.type} value={action.type}>
                  {action.label} - {action.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">On Update</label>
            <select
              value={relationship.config.onUpdate}
              onChange={(e) =>
                setRelationship({
                  ...relationship,
                  config: {
                    ...relationship.config,
                    onUpdate: e.target.value as ReferentialAction,
                  },
                })
              }
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              {REFERENTIAL_ACTIONS.map((action) => (
                <option key={action.type} value={action.type}>
                  {action.label} - {action.description}
                </option>
              ))}
            </select>
          </div>
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
          Create Relationship
        </button>
      </div>
    </form>
  )
}