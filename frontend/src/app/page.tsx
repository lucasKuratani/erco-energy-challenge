import { login, register } from '@/app/actions'
import classnames from 'classnames'
import Image from 'next/image'
import logo from '@/app/img/logo.svg'

function FormFields({ isRegister }: { isRegister?: boolean }) {
  return (
    <div>
      <div className={classnames('mt-4 grid', { hidden: !isRegister })}>
        <label htmlFor='fullName'>Full name</label>
        <input type='text' id='fullName' name='fullName' className='rounded border border-neutral-300 p-2' />
      </div>
      <div className='mt-4 grid'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' name='email' className='rounded border border-neutral-300 p-2' />
      </div>
      <div className='mt-4 grid'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' className='rounded border border-neutral-300 p-2' />
      </div>
      <button
        type='submit'
        className='mt-8 w-full cursor-pointer rounded-lg bg-teal-700 p-2 text-white transition-colors hover:bg-teal-600'
      >
        {isRegister ? 'Register' : 'Log in'}
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-y-16 bg-slate-700'>
      <Image src={logo} alt='Erco Energy logo' height={50} />
      <div className='flex gap-x-16 rounded border-b-8 border-teal-500 bg-white p-8 shadow'>
        <div>
          <h1 className='text-xl font-bold text-slate-400'>Log in</h1>
          <form action={login} className='grid'>
            <FormFields />
          </form>
        </div>
        <div className='rounded-full border-l-2 border-slate-400' />
        <div>
          <h1 className='text-xl font-bold text-slate-400'>Register</h1>
          <form action={register} className='grid'>
            <FormFields isRegister={true} />
          </form>
        </div>
      </div>
    </main>
  )
}
