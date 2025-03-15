'use client'

import { useActionState, useEffect } from 'react'
import { Task, updateTask } from '@/app/(pages)/board/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const initialState = { success: false, message: '' }

export function EditForm({ task }: { task: Task }) {
  const [state, formAction, pending] = useActionState(updateTask, initialState)

  useEffect(() => {
    if (!state) return

    if (state.success) return redirect('/board')

    if (!state.success && state.message) return alert(state.message)
  }, [state])

  return (
    <form action={formAction} className='grid min-w-[400px] gap-y-4 rounded-lg border border-neutral-300 bg-white p-8'>
      <input type='number' className='hidden' name='id' defaultValue={task.id} />
      <h1 className='text-lg font-bold text-neutral-500'>Update task #{task.id}</h1>
      <div className='grid'>
        <label htmlFor='title'>Title</label>
        <input
          defaultValue={task.title}
          type='text'
          id='title'
          name='title'
          className='rounded border border-neutral-300 bg-white p-2'
        />
      </div>
      <div className='grid'>
        <label htmlFor='description'>Description</label>
        <textarea
          defaultValue={task.description}
          id='description'
          name='description'
          className='max-h-40 rounded border border-neutral-300 bg-white p-2'
        />
      </div>
      <div className='grid'>
        <label htmlFor='priority'>Priority</label>
        <select
          defaultValue={task.priority}
          id='priority'
          name='priority'
          className='rounded border border-neutral-300 bg-white p-2'
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>
      <div className='grid'>
        <label htmlFor='priority'>Status</label>
        <select
          defaultValue={task.status}
          id='status'
          name='status'
          className='rounded border border-neutral-300 bg-white p-2'
        >
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
          <option value='Canceled'>Canceled</option>
        </select>
      </div>
      <div className='flex gap-x-4'>
        <Link href='/board'>
          <button
            type='button'
            disabled={pending}
            className='min-w-30 cursor-pointer rounded-lg bg-red-600 p-4 text-white transition-colors hover:bg-red-500'
          >
            Cancel
          </button>
        </Link>
        <button
          type='submit'
          disabled={pending}
          className='min-w-30 cursor-pointer rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-500'
        >
          Update
        </button>
      </div>
    </form>
  )
}
