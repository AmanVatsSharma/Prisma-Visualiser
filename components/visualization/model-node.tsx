import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import type { PrismaModel } from '@/lib/store/schema-store'

interface ModelNodeData {
  model: PrismaModel
}

export const ModelNode = memo(({ data, selected }: NodeProps<ModelNodeData>) => {
  const { model } = data

  return (
    <>
      <NodeResizer
        minWidth={180}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400 rounded"
      />
      
      {/* Input handle for incoming relationships */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-gray-400 border-2 border-white"
      />
      
      {/* Output handle for outgoing relationships */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-gray-400 border-2 border-white"
      />

      <div className="bg-white border rounded-lg shadow-lg min-w-[180px]">
        <div className="px-4 py-2 border-b bg-gray-50 rounded-t-lg">
          <h3 className="font-medium text-gray-800">{model.name}</h3>
          {model.attributes.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {model.attributes.map((attr, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-xs"
                >
                  {attr.name}
                  {attr.value && `(${attr.value})`}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="px-4 py-2 space-y-1">
          {model.fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">{field.name}</span>
                <span className="text-gray-500">{field.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                {field.isRequired && (
                  <span className="text-yellow-600 text-xs">required</span>
                )}
                {field.attributes.map((attr, attrIndex) => (
                  <span
                    key={attrIndex}
                    className="px-1 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
})

ModelNode.displayName = 'ModelNode' 