import { useCallback, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  Node,
  Edge,
  MarkerType,
  getRectOfNodes,
  getTransformForBounds,
} from 'reactflow'
import { useSchemaStore } from '@/lib/store/schema-store'
import { ModelNode } from './model-node'
import { RelationshipEdge } from './relationship-edge'
import { toPng } from 'html-to-image'
import 'reactflow/dist/style.css'
import '@reactflow/node-resizer/dist/style.css'

const nodeTypes = {
  model: ModelNode,
}

const edgeTypes = {
  relationship: RelationshipEdge,
}

export function SchemaDiagram() {
  const models = useSchemaStore((state) => state.models)
  const relationships = useSchemaStore((state) => state.relationships)
  const { fitView, getNodes } = useReactFlow()

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const updateLayout = useCallback(() => {
    // Create nodes from models
    const newNodes: Node[] = models.map((model, index) => ({
      id: model.id,
      type: 'model',
      position: { x: index * 300, y: 0 },
      data: { model },
    }))

    // Create edges from relationships
    const newEdges: Edge[] = relationships.map((relationship) => ({
      id: relationship.id,
      source: relationship.fromModel,
      target: relationship.toModel,
      type: 'relationship',
      data: { relationship },
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#9CA3AF',
      },
    }))

    setNodes(newNodes)
    setEdges(newEdges)

    // Auto-fit the view after a short delay to ensure nodes are rendered
    setTimeout(() => {
      fitView({ padding: 0.2 })
    }, 100)
  }, [models, relationships, setNodes, setEdges, fitView])

  // Update layout when models or relationships change
  useEffect(() => {
    updateLayout()
  }, [updateLayout])

  const downloadImage = useCallback(async () => {
    const nodesBounds = getRectOfNodes(getNodes())
    const transform = getTransformForBounds(
      nodesBounds,
      nodesBounds.width,
      nodesBounds.height,
      0.2,
      1
    )
    
    const element = document.querySelector('.react-flow__viewport') as HTMLElement
    if (!element) return

    const dataUrl = await toPng(element, {
      backgroundColor: '#F9FAFB',
      width: nodesBounds.width,
      height: nodesBounds.height,
      style: {
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    })

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'schema-diagram.png'
    link.click()
  }, [getNodes])

  const copyToClipboard = useCallback(async () => {
    const element = document.querySelector('.react-flow__viewport') as HTMLElement
    if (!element) return

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: '#F9FAFB',
      })

      const blob = await fetch(dataUrl).then(res => res.blob())
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])
    } catch (error) {
      console.error('Failed to copy diagram to clipboard:', error)
    }
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      className="bg-gray-50"
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor="#E5E7EB"
        maskColor="rgba(243, 244, 246, 0.7)"
        className="!bottom-4 !right-4"
      />
      <Panel position="top-right" className="space-x-2">
        <button
          onClick={updateLayout}
          className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
        >
          Reset Layout
        </button>
        <button
          onClick={downloadImage}
          className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
        >
          Download PNG
        </button>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50"
        >
          Copy to Clipboard
        </button>
      </Panel>
    </ReactFlow>
  )
} 