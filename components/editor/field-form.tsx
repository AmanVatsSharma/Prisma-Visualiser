import { useState } from 'react'
import type { PrismaField } from '@/lib/store/schema-store'
import { PRISMA_TYPE_OPTIONS, PRISMA_FIELD_ATTRIBUTES } from '@/lib/types/prisma-types'

interface FieldFormProps {
  initialField?: PrismaField
  onSubmit: (field: PrismaField) => void
  onCancel: () => void
}

export function FieldForm({ initialField, onSubmit, onCancel }: FieldFormProps) {
  const [field, setField] = useState<PrismaField>({
    name: initialField?.name ?? '',
    type: initialField?.type ?? 'String',
    isRequired: initialField?.isRequired ?? false,
    attributes: initialField?.attributes ?? [],
    defaultValue: initialField?.defaultValue,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(field)
  }

  const toggleAttribute = (attribute: string) => {
    setField((prev) => ({
      ...prev,
      attributes: prev.attributes.includes(attribute)
        ? prev.attributes.filter((a) => a !== attribute)
        : [...prev.attributes, attribute],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Field Name
        </label>
        <input
          id="name"
          type="text"
          value={field.name}
          onChange={(e) => setField({ ...field, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter field name..."
          required
          pattern="^[a-z][a-zA-Z]*$"
          title="Field name must start with a lowercase letter and contain only letters"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Field Type
        </label>
        <select
          id="type"
          value={field.type}
          onChange={(e) => setField({ ...field, type: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        >
          {PRISMA_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} - {option.description}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="required"
          type="checkbox"
          checked={field.isRequired}
          onChange={(e) => setField({ ...field, isRequired: e.target.checked })}
          className="rounded border-gray-300"
        />
        <label htmlFor="required" className="text-sm font-medium">
          Required Field
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Attributes</label>
        <div className="flex flex-wrap gap-2">
          {PRISMA_FIELD_ATTRIBUTES.map((attribute) => (
            <button
              key={attribute}
              type="button"
              onClick={() => toggleAttribute(attribute)}
              className={`px-3 py-1 text-sm rounded-full ${
                field.attributes.includes(attribute)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {attribute}
            </button>
          ))}
        </div>
      </div>

      {field.type !== 'Boolean' && (
        <div className="space-y-2">
          <label htmlFor="defaultValue" className="text-sm font-medium">
            Default Value
          </label>
          <input
            id="defaultValue"
            type="text"
            value={field.defaultValue ?? ''}
            onChange={(e) =>
              setField({ ...field, defaultValue: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter default value..."
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialField ? 'Update' : 'Add'} Field
        </button>
      </div>
    </form>
  )
} 