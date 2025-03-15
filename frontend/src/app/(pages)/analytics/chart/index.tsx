'use client'

import { Report } from '@/app/(pages)/analytics/actions'
import { ResponsiveContainer, LineChart, CartesianGrid, Legend, Line, XAxis, YAxis, Tooltip } from 'recharts'

export function TasksChart({ tasks }: { tasks: Report['tasksCreatedByDay'] }) {
  return (
    <div className='mt-8 h-[450px] rounded-lg bg-white p-8 shadow'>
      <ResponsiveContainer>
        <LineChart data={tasks}>
          <CartesianGrid strokeDasharray='3 5' />
          <Legend />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
          <XAxis
            interval={0}
            dataKey='creation_date'
            tick={{ fontSize: 14 }}
            padding={{ right: 40, left: 40 }}
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
          />
          <YAxis dataKey='task_count' tick={{ fontSize: 14 }} allowDecimals={false} />
          <Line dataKey='task_count' name='Created tasks' legendType='square' strokeWidth={5} stroke='#48c71e' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
