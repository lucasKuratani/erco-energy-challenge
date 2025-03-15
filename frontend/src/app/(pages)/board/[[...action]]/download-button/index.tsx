'use client'

import { useEffect, useState, useRef } from 'react'
import { Task } from '@/app/(pages)/board/actions'

export function DownloadButton({ tasks }: { tasks: Task[] }) {
  const [url, setUrl] = useState('')

  const ref = useRef<HTMLAnchorElement>(document.createElement('a'))

  useEffect(() => {
    if (!url) return

    ref.current.click()
  }, [url])

  function handleButtonClick() {
    const newUrl = URL.createObjectURL(new Blob([JSON.stringify(tasks, null, 2)]))

    setUrl(newUrl)
  }

  return (
    <>
      <button
        type='button'
        onClick={handleButtonClick}
        className='cursor-pointer rounded-lg p-2 text-fuchsia-400 transition-colors hover:text-fuchsia-600'
      >
        Download tasks as JSON
      </button>
      <a href={url} className='hidden' ref={ref} download='tasks.json' />
    </>
  )
}
