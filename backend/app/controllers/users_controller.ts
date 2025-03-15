import User from '#models/user'
import { createUserValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request }: HttpContext) {
    const body = await request.validateUsing(createUserValidator)

    const user = new User()

    await user.merge(body).save()

    const token = await User.accessTokens.create(user)

    return { token: token.toJSON().token, user }
  }
}
