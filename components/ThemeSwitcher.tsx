'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";
import Link from 'next/link';

const ThemeSwitcher = () => {

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className='flex items-center space-x-3'>
      <Link href='/tags' className='hover:text-purple-500'>
        #tags
      </Link>
      <Link href='/studio' className='border-2 border-purple-500 p-2 rounded-2xl hover:bg-purple-400 transition duration-200'>
        <span className=''>studio</span>
      </Link>

      <button className='' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <MdOutlineWbSunny className='text-purple-500 w-6 h-6 font-bold' /> : <BsMoonStars className='text-purple-500 w-5 h-5 font-bold' />}
      </button>
    </div>
  )
}

export default ThemeSwitcher