import React, { useState } from 'react'
import { Position, useReactFlow } from '@xyflow/react'
import { BaseNode } from './Basenode'

export default function ConditionFilterNode({ id, data }) {
  const { updateNodeData } = useReactFlow()
  const [field, setField] = useState(data?.field || '')
  const [operator, setOperator] = useState(data?.operator || '==')
  const [value, setValue] = useState(data?.value || '')

  const handleFieldChange = (e) => {
    setField(e.target.value)
    updateNodeData(id, { field: e.target.value })
  }

  const handleOperatorChange = (e) => {
    setOperator(e.target.value)
    updateNodeData(id, { operator: e.target.value })
  }

  const handleValueChange = (e) => {
    setValue(e.target.value)
    updateNodeData(id, { value: e.target.value })
  }

  const operators = ['==', '!=', '>', '<', '>=', '<=', 'contains', 'startsWith', 'endsWith']

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      color: '#10b981',
      label: 'Input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'true-output',
      color: '#10b981',
      label: 'True',
      style: { top: '25%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'false-output',
      color: '#ef4444',
      label: 'False',
      style: { top: '75%' }
    }
  ]

  return (
    <BaseNode
      id={id}
      label="Condition Filter"
      description="Branch execution based on conditions"
      icon="🔀"
      accentColor="#10b981"
      handles={handles}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-400 block">Field</label>
          <input
            type="text"
            placeholder="e.g., status"
            value={field}
            onChange={handleFieldChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block">Operator</label>
          <select
            value={operator}
            onChange={handleOperatorChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300"
          >
            {operators.map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400 block">Value</label>
          <input
            type="text"
            placeholder="e.g., active"
            value={value}
            onChange={handleValueChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600"
          />
        </div>
      </div>
    </BaseNode>
  )
}
