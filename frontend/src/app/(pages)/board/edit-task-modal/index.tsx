import { fetchTask } from '@/app/(pages)/board/actions'
import { EditForm } from '@/app/(pages)/board/edit-task-modal/edit-form'

export async function EditTaskModal({ id }: { id: number }) {
  const task = await fetchTask(id)

  if (!task.success) return

  return (
    <div className='absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center rounded-lg bg-slate-500/50 p-8'>
      <EditForm task={task.data} />
    </div>
  )
}
