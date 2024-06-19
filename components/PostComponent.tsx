import { Post } from '@/utils/interface'
import Link from 'next/link'
import React from 'react'
import { Lilita_One, VT323 } from 'next/font/google'

const font = Lilita_One({ weight:'400', subsets: ["latin"] });
const dateFont = VT323({ weight:'400', subsets: ["latin"] });

interface Props {
  post: Post
}

const PostComponent = ({ post }: Props) => {
  return (
    <div className={cardStyle}>
      <Link href={`/posts/${post.slug.current}`}>
        <h2 className={`${font.className} text-2xl dark:text-slate-300`}>{post.title}</h2>
        <p className={`${dateFont.className} my-2 text-purple-600`}>{new Date(post.publishAt).toDateString()}</p>
        <p className='dark:text-gray-400 mb-4 line-clamp-2'>{post.excerpt}</p>
      </Link>

      {/* TAGS */}
      <div>
        {post?.tags?.map((tag) => (
          <span className='mr-2 p-2 rounded-md text-sm lowercase dark:bg-gray-900 border dark:border-gray-900' key={tag._id}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PostComponent

const cardStyle = `
  mb-4
  p-4
  border
  border-gray-300
  dark:border-purple-950
  rounded-md
  shadow-sm
  dark:shadow-purple-900
  hover:shadow-md
  hover:bg-purple-500
  hover:text-white
  hover:dark:bg-purple-950
`; 