import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Lucas Morganti Kuratani',
        email: 'lkuratani@erco.energy',
        password: 'safe_password',
      },
      {
        fullName: 'Isaac Newton',
        email: 'inewton@erco.energy',
        password: 'safe_password',
      },
    ])
  }
}
