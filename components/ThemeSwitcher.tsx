'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdOutlineWbSunny } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";

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
    <button className='' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <MdOutlineWbSunny className='text-purple-500 w-6 h-6 font-bold' /> : <BsMoonStars className='text-purple-500 w-5 h-5 font-bold' />}
    </button>
  )
}

export default ThemeSwitcher