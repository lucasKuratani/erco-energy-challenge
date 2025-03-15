'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const links = [
  { title: 'Board', href: '/board' },
  { title: 'Analytics', href: '/analytics' },
]

export function Menu() {
  const pathname = usePathname()

  return (
    <ul className='flex gap-x-8'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames('tracking-wide text-slate-300 transition-all hover:opacity-100', {
              'opacity-25': !pathname.includes(link.href),
              'underline underline-offset-8': pathname.includes(link.href),
            })}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
