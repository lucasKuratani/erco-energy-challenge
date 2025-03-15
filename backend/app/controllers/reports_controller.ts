import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ReportsController {
  async handle({ auth }: HttpContext) {
    const user = await auth.authenticate()

    const baseQuery = db.from('tasks').where('user_id', user.id)

    const totalNumberOfTasks = await baseQuery.count('* as value').first()

    const [statusesPercentages] = await db.rawQuery(
      'SELECT status, (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM tasks)) AS percentage FROM tasks GROUP BY status;'
    )

    const [averageCompletionTimeMinutes] = await db.rawQuery(
      'SELECT AVG(TIMESTAMPDIFF(SECOND, created_at, completed_at)) / 60.0 AS value FROM tasks WHERE completed_at IS NOT NULL;'
    )

    const [tasksCreatedByDay] = await db.rawQuery(
      'SELECT DATE(created_at) AS creation_date, COUNT(*) AS task_count FROM tasks GROUP BY DATE(created_at) ORDER BY DATE(created_at);'
    )

    return {
      totalNumberOfTasks: totalNumberOfTasks.value,
      statusesPercentages: statusesPercentages.map(
        (entry: { status: string; percentage: string }) => ({
          ...entry,
          percentage: Number(entry.percentage),
        })
      ),
      tasksCreatedByDay,
      averageCompletionTimeMinutes: Number(averageCompletionTimeMinutes[0].value),
    }
  }
}
