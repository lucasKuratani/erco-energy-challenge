import Image from 'next/image'
import { cookies } from 'next/headers'
import logo from '@/app/img/logo.svg'
import { Menu } from '@/app/components/navigation/menu'
import { logout } from '@/app/components/navigation/actions'

export async function Navigation() {
  const cookieStore = await cookies()

  const name = cookieStore.get('name')?.value

  const email = cookieStore.get('email')?.value

  return (
    <nav className='flex justify-between bg-slate-800 p-8'>
      <div className='flex gap-x-16'>
        <Image src={logo} alt='Erco Energy logo' />
        <Menu />
      </div>
      <form action={logout} className='flex gap-x-8'>
        <p className='flex gap-x-2 text-sm'>
          <span className='text-slate-400'>{name}</span>
          <span className='text-slate-600'>({email})</span>
        </p>
        <button
          type='submit'
          className='cursor-pointer font-bold text-red-500 opacity-50 transition-opacity hover:opacity-100'
        >
          Log out
        </button>
      </form>
    </nav>
  )
}
