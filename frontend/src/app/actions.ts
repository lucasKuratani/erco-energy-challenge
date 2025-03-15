'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api } from '@/app/services/api'

type AuthResponse = { token: string; user: { email: string; fullName: string } }

export async function login(formData: FormData) {
  const cookieStore = await cookies()

  const email = formData.get('email')

  const password = formData.get('password')

  const { data } = await api.post<AuthResponse>('auth', { email, password })

  cookieStore.set('token', data.token, { httpOnly: true })

  cookieStore.set('email', data.user.email)

  cookieStore.set('name', data.user.fullName)

  redirect('/board')
}

export async function register(formData: FormData) {
  const cookieStore = await cookies()

  const fullName = formData.get('fullName')

  const email = formData.get('email')

  const password = formData.get('password')

  const { data } = await api.post<AuthResponse>('users', { fullName, email, password })

  cookieStore.set('token', data.token, { httpOnly: true })

  cookieStore.set('email', data.user.email)

  cookieStore.set('name', data.user.fullName)

  redirect('/board')
}
