import type { HttpContext } from '@adonisjs/core/http'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import Task from '#models/task'
import { DateTime } from 'luxon'

export default class TasksController {
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()

    const tasks = await Task.query().orderBy('createdAt', 'desc').where('user_id', user.id)

    return tasks
  }

  async show({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const id = request.param('id')

    const task = await Task.findOrFail(id)

    if (task.userId !== user.id) {
      return response.status(403).json({ errors: [{ message: 'You cannot see this task.' }] })
    }

    return task
  }

  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()

    const body = await request.validateUsing(createTaskValidator)

    const task = new Task().merge({ userId: user.id, status: 'To Do', ...body })

    await task.save()

    return task
  }

  async update({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const body = await request.validateUsing(updateTaskValidator)

    const id = request.param('id')

    const task = await Task.findOrFail(id)

    if (task.userId !== user.id) {
      return response
        .status(401)
        .json({ errors: [{ message: 'You are not allowed to update this task.' }] })
    }

    if (body.status === 'Completed' && task.status !== 'Completed') {
      task.completedAt = DateTime.now()
    }

    if (body.status !== 'Completed' && task.completedAt !== null) {
      task.completedAt = null
    }

    task.merge(body)

    return await task.save()
  }

  async destroy({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const id = request.param('id')

    const task = await Task.findOrFail(id)

    if (task.userId !== user.id) {
      return response
        .status(401)
        .json({ errors: [{ message: 'You are not allowed to delete this task.' }] })
    }

    await task.delete()
  }
}
