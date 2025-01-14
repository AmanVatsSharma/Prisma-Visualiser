import { useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { useSchemaStore } from '@/lib/store/schema-store'
import { generateSchema } from '@/lib/utils/schema-generator'

export function CodePreview() {
  const models = useSchemaStore((state) => state.models)
  const relationships = useSchemaStore((state) => state.relationships)

  const handleCopy = useCallback(async () => {
    const schema = generateSchema(models, relationships)
    await navigator.clipboard.writeText(schema)
  }, [models, relationships])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Generated Schema</h2>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
        >
          Copy to Clipboard
        </button>
      </div>
      
      <div className="flex-1 border rounded-lg overflow-hidden">
        <Editor
          defaultLanguage="prisma"
          value={generateSchema(models, relationships)}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            automaticLayout: true,
          }}
          theme="vs-light"
        />
      </div>
    </div>
  )
} 