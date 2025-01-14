'use client'

import { useState } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { ModelList } from '@/components/editor/model-list'
import { RelationshipList } from '@/components/editor/relationship-list'
import { SchemaDebug } from '@/components/editor/schema-debug'
import { SchemaDiagram } from '@/components/visualization/schema-diagram'
import { CodePreview } from '@/components/editor/code-preview'

export default function Home() {
  const [showDebug, setShowDebug] = useState(false)
  const [activeTab, setActiveTab] = useState<'diagram' | 'code'>('diagram')

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Schema Builder</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            >
              {showDebug ? 'Hide' : 'Show'} Debug
            </button>
          </div>
        </div>

        {showDebug && <SchemaDebug />}

        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-10rem)]">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Models</h2>
              <ModelList />
            </div>
            <div className="border rounded-lg p-4 bg-card overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Relationships</h2>
              <RelationshipList />
            </div>
          </div>
          <div className="border rounded-lg bg-card overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'diagram'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Schema Diagram
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'code'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Generated Code
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              {activeTab === 'diagram' ? (
                <ReactFlowProvider>
                  <SchemaDiagram />
                </ReactFlowProvider>
              ) : (
                <div className="p-4 h-full">
                  <CodePreview />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
