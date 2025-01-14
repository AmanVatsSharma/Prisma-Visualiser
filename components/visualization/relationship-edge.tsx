import { memo } from 'react'
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer } from 'reactflow'
import type { Relationship } from '@/lib/store/schema-store'

interface RelationshipEdgeData {
  relationship: Relationship
}

export const RelationshipEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<RelationshipEdgeData>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const { relationship } = data || {}
  if (!relationship) return null

  const getRelationshipSymbol = () => {
    switch (relationship.type) {
      case 'ONE_TO_ONE':
        return '1:1'
      case 'ONE_TO_MANY':
        return '1:N'
      case 'MANY_TO_MANY':
        return 'N:N'
      default:
        return ''
    }
  }

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path stroke-gray-400"
        strokeWidth={2}
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="flex items-center justify-center bg-white border rounded-lg shadow-sm px-2 py-1">
            <span className="font-medium text-sm text-gray-700">
              {getRelationshipSymbol()}
            </span>
          </div>
          {relationship.config.fields.length > 0 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
              <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {relationship.config.fields.map((field, index) => (
                  <div key={index}>
                    {field.fieldName} → {field.referencedField}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  )
})

RelationshipEdge.displayName = 'RelationshipEdge' 