'use server'

import { cookies } from 'next/headers'
import { api } from '@/app/services/api'

export type Report = {
  totalNumberOfTasks: number
  statusesPercentages: {
    status: string
    percentage: number
  }[]
  averageCompletionTimeMinutes: number
  tasksCreatedByDay: {
    creation_date: string
    task_count: number
  }[]
}

export async function fetchReport() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const { data } = await api.get<Report>('reports', { headers: { Authorization: `Bearer ${token}` } })

  return data
}
