import { fetchReport } from '@/app/(pages)/analytics/actions'
import { TasksChart } from '@/app/(pages)/analytics/chart'
import classnames from 'classnames'

export default async function Page() {
  const report = await fetchReport()

  return (
    <div className='overflow-y-auto bg-slate-700 p-8'>
      <div className='grid grid-cols-4 gap-8'>
        <div className='col-span-2 flex items-center justify-between rounded-lg bg-slate-500 p-8 shadow'>
          <h1 className='font-bold text-slate-200'>Total number of tasks</h1>
          <p className={classnames('text-3xl font-bold text-slate-100')}>{report.totalNumberOfTasks}</p>
        </div>
        <div className='col-span-2 flex items-center justify-between rounded-lg bg-slate-500 p-8 shadow'>
          <h1 className='font-bold text-slate-200'>Average completion time</h1>
          <p className={classnames('text-3xl font-bold text-slate-100')}>
            {(report.averageCompletionTimeMinutes / 1440).toFixed(2)} days
          </p>
        </div>
        {report.statusesPercentages.map((entry) => (
          <div key={entry.status} className='flex items-center justify-between rounded-lg bg-slate-500 p-8 shadow'>
            <h1 className='font-bold text-slate-200'>{entry.status} percentage</h1>
            <p
              className={classnames('text-3xl font-bold', {
                'text-slate-100': entry.status === 'To Do',
                'text-amber-500': entry.status === 'In Progress',
                'text-emerald-500': entry.status === 'Completed',
                'text-red-600': entry.status === 'Canceled',
              })}
            >
              {Intl.NumberFormat('en-us', {
                style: 'percent',
                minimumFractionDigits: 2,
              }).format(entry.percentage / 100)}
            </p>
          </div>
        ))}
      </div>
      <TasksChart tasks={report.tasksCreatedByDay} />
    </div>
  )
}
