import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().escape(),
    priority: vine.enum(['Low', 'Medium', 'High']),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().escape().optional(),
    status: vine.enum(['To Do', 'In Progress', 'Completed', 'Canceled']).optional(),
    priority: vine.enum(['Low', 'Medium', 'High']).optional(),
  })
)
