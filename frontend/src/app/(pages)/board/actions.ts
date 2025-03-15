'use server'

import { cookies } from 'next/headers'
import { api } from '@/app/services/api'
import z from 'zod'

export type Task = {
  id: number
  userId: number
  title: string
  description: string
  status: string
  priority: string
  completedAt: string
  createdAt: string
  updatedAt: string
}

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['Low', 'Medium', 'High']),
})

const updateTaskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['To Do', 'In Progress', 'Completed', 'Canceled']),
  priority: z.enum(['Low', 'Medium', 'High']),
})

export async function fetchTasks() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const { data } = await api.get<Task[]>('tasks', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
}

export async function fetchTask(id: number) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const task = await api
    .get<Task>(`tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => ({ success: true, data }) as const)
    .catch(() => ({ success: false, message: 'Failed to fetch task.' }) as const)

  return task
}

export async function createTask(_prevState: unknown, formData: FormData) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const payload = createTaskSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!payload.success) return { success: false, message: 'Invalid data.' }

  return await api
    .post('tasks', payload.data, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => ({ success: true, message: '' }))
    .catch(() => ({ success: false, message: 'Failed to create task.' }))
}

export async function updateTask(_prevState: unknown, formData: FormData) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const payload = updateTaskSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    id: Number(formData.get('id')),
  })

  if (!payload.success) return { success: false, message: JSON.stringify(payload.error) }

  return await api
    .patch(`tasks/${payload.data.id}`, payload.data, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => ({ success: true, message: '' }))
    .catch(() => ({ success: false, message: 'Failed to update task.' }))
}
