import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {

  return (
    <div className='mx-auto max-w-5xl px-6'>
      <div className='flex justify-between items-center h-16 w-full'>
        <Link href='/'>
          <div>Dev Blog</div>
        </Link>

        <ThemeSwitcher/>
      </div>
    </div>
  )
}

export default Navbar