import Header from "@/components/Header"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div>
      <Header title="404 - Not Found"/>

      <div className="flex justify-center">
        <Link href='/' className="text-xl hover:text-white hover:bg-purple-800 border p-3 rounded-xl">
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage