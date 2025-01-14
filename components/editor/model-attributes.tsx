import { useState } from 'react'
import { PRISMA_MODEL_ATTRIBUTES, type PrismaModelAttribute } from '@/lib/types/prisma-types'

interface ModelAttributesProps {
  attributes: PrismaModelAttribute[]
  onChange: (attributes: PrismaModelAttribute[]) => void
}

export function ModelAttributes({ attributes, onChange }: ModelAttributesProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<string>('')
  const [attributeValue, setAttributeValue] = useState<string>('')

  const handleAddAttribute = () => {
    if (!selectedAttribute) return

    const attrDef = PRISMA_MODEL_ATTRIBUTES.find(a => a.name === selectedAttribute)
    if (!attrDef) return

    const newAttribute: PrismaModelAttribute = {
      name: selectedAttribute,
      ...(attrDef.requiresValue && { value: attributeValue }),
    }

    onChange([...attributes, newAttribute])
    setSelectedAttribute('')
    setAttributeValue('')
  }

  const handleRemoveAttribute = (index: number) => {
    onChange(attributes.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select
          value={selectedAttribute}
          onChange={(e) => setSelectedAttribute(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        >
          <option value="">Select an attribute...</option>
          {PRISMA_MODEL_ATTRIBUTES.map((attr) => (
            <option key={attr.name} value={attr.name}>
              {attr.name} - {attr.description}
            </option>
          ))}
        </select>
        {selectedAttribute && PRISMA_MODEL_ATTRIBUTES.find(a => a.name === selectedAttribute)?.requiresValue && (
          <input
            type="text"
            value={attributeValue}
            onChange={(e) => setAttributeValue(e.target.value)}
            placeholder="Attribute value..."
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
        )}
        <button
          type="button"
          onClick={handleAddAttribute}
          disabled={!selectedAttribute}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {attributes.map((attr, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm">{attr.name}</span>
              {attr.value && (
                <span className="text-sm text-gray-500">({attr.value})</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveAttribute(index)}
              className="text-red-600 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 