import Link from "next/link"
import { Lilita_One } from "next/font/google"
import { RiArrowGoBackLine } from "react-icons/ri";

const font = Lilita_One({ weight: '400', subsets: ['latin'] })

const CmsNavbar = () => {
  return (
    <div className="m-5 flex items-centerf justify-between px-5">
      <Link href='/'>
        <div className="flex items-center space-x-3 text-purple-500">
          <RiArrowGoBackLine className="font-bold text-xl" />
          <span className="text-lg ">Go to Website</span>
        </div>
      </Link>

      <div className={`${font.className} text-3xl text-amber-200`}>
        Dev
        <span className='text-purple-400'>Blog</span>
      </div>
    </div>
  )
}

export default CmsNavbar