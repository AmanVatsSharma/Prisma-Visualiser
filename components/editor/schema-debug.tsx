import { useSchemaStore } from '@/lib/store/schema-store'

export function SchemaDebug() {
  const models = useSchemaStore((state) => state.models)
  const relationships = useSchemaStore((state) => state.relationships)

  return (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-4 text-sm font-mono">
      <div>
        <h3 className="font-bold mb-2">Models ({models.length})</h3>
        <pre className="overflow-auto max-h-40">
          {JSON.stringify(models, null, 2)}
        </pre>
      </div>
      <div>
        <h3 className="font-bold mb-2">Relationships ({relationships.length})</h3>
        <pre className="overflow-auto max-h-40">
          {JSON.stringify(relationships, null, 2)}
        </pre>
      </div>
    </div>
  )
} 