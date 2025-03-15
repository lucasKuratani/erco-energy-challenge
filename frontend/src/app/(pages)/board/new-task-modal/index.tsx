'use client'

import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { createTask } from '@/app/(pages)/board/actions'
import { redirect } from 'next/navigation'

const initialState = { success: false, message: '' }

export function NewTaskModal() {
  const [state, formAction, pending] = useActionState(createTask, initialState)

  useEffect(() => {
    if (!state) return

    if (state.success) return redirect('/board')

    if (!state.success && state.message) return alert(state.message)
  }, [state])

  return (
    <div className='absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center rounded-lg bg-slate-500/50 p-8'>
      <form
        action={formAction}
        className='grid min-w-[400px] gap-y-4 rounded-lg border border-neutral-300 bg-white p-8'
      >
        <h1 className='text-lg font-bold text-neutral-500'>Create new task</h1>
        <div className='grid'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' className='rounded border border-neutral-300 bg-white p-2' />
        </div>
        <div className='grid'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            className='max-h-40 rounded border border-neutral-300 bg-white p-2'
          />
        </div>
        <div className='grid'>
          <label htmlFor='priority'>Priority</label>
          <select id='priority' name='priority' className='rounded border border-neutral-300 bg-white p-2'>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
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
            disabled={pending}
            type='submit'
            className='min-w-30 cursor-pointer rounded-lg bg-emerald-600 p-4 text-white transition-colors hover:bg-emerald-500'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
