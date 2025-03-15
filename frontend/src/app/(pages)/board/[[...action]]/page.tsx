import { fetchTasks } from '@/app/(pages)/board/actions'
import classnames from 'classnames'
import { TbProgress, TbProgressBolt, TbProgressCheck, TbProgressX } from 'react-icons/tb'
import { NewTaskModal } from '@/app/(pages)/board/new-task-modal'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { EditTaskModal } from '@/app/(pages)/board/edit-task-modal'
import { DownloadButton } from '@/app/(pages)/board/[[...action]]/download-button'

const statuses = [
  { name: 'To Do', icon: TbProgress },
  { name: 'In Progress', icon: TbProgressBolt },
  { name: 'Completed', icon: TbProgressCheck },
  { name: 'Canceled', icon: TbProgressX },
]

export default async function Page({ params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params

  if (action && action.length > 2) return redirect('/board')

  if (action && !['new', 'edit'].includes(action[0])) return redirect('/board')

  const tasks = await fetchTasks()

  return (
    <div
      className={classnames('bg-slate-700 p-8', { 'overflow-y-hidden pr-12': !!action, 'overflow-y-auto': !action })}
    >
      {action?.[0] === 'new' && <NewTaskModal />}
      {action?.[0] === 'edit' && <EditTaskModal id={Number(action?.[1])} />}
      <div className='flex justify-between'>
        <Link href='/board/new'>
          <button
            type='button'
            className='cursor-pointer rounded-lg bg-emerald-600 p-2 text-white transition-all hover:bg-emerald-500'
          >
            Create new task
          </button>
        </Link>
        <DownloadButton tasks={tasks} />
      </div>
      <div className='mt-8 grid grid-cols-4 gap-x-8'>
        {statuses.map((status) => (
          <div key={status.name} className='flex flex-col gap-y-4 rounded-lg bg-neutral-200 p-8 shadow-lg'>
            <p className='flex items-center font-bold text-neutral-500'>
              <status.icon className='mr-2 text-xl' />
              {status.name}
            </p>
            {tasks
              .filter((task) => task.status === status.name)
              .map((task) => (
                <Link key={task.id} href={`/board/edit/${task.id}`}>
                  <div className='grid grid-cols-[auto_1fr] rounded-lg border border-neutral-300 bg-white opacity-75 hover:opacity-100'>
                    <div
                      className={classnames('row-span-3 h-full w-2 rounded-tl-lg rounded-bl-lg', {
                        'bg-emerald-500': task.priority === 'Low',
                        'bg-amber-300': task.priority === 'Medium',
                        'bg-red-500': task.priority === 'High',
                      })}
                    />
                    <p className='px-4 pt-4 font-bold'>{task.title}</p>
                    <p className='mt-4 px-4'>{task.description}</p>
                    <div className='mt-4 flex justify-between px-4 pb-2 font-bold text-neutral-300'>
                      <p>{new Date(task.createdAt).toLocaleDateString()}</p>
                      {task.completedAt && (
                        <p className='text-green-500'>{new Date(task.completedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
