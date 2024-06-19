import Header from "@/components/Header";
import RenderYoutubeVideo from "@/components/RenderYoutubeVideo";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Post } from "@/utils/interface";
import { PortableText } from "next-sanity";
import { VT323 } from 'next/font/google'
import Link from "next/link";
import { notFound } from "next/navigation";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Params {
  params: {
    slug: string
  }
}

const dateFont = VT323({ weight: '400', subsets: ["latin"] });

const getPost = async (slug: String) => {
  const query = `
  *[_type == 'post' && slug.current == "${slug}"][0] {
    title,
    slug,
    publishAt,
    excerpt,
    _id,
    tags[]->{
      _id,
      slug,
      name
    },
    body
  }
  `;

  const post = await client.fetch(query)

  return post;
}

export const revalidate = 60;

const PostPage = async ({ params }: Params) => {

  const post: Post = await getPost(params.slug)

  if(!post){
    notFound()
  }

  return (
    <div>
      <Header title={post?.title} />

      <div className="text-center">
        <span className={`${dateFont.className} text-purple-500`}>
          {new Date(post?.publishAt).toDateString()}
        </span>

        <div className="mt-5">
          {post?.tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
              <span className="mr-2 p-2 rounded-md text-sm lowercase dark:bg-gray-900 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className={richTextStyles}>
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  )
}

export default PostPage

const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  mx-auto
  prose-headings:my-5
  prose-headings:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
`;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlForImage(value.asset._ref)}
        alt={value.alt}
        className="rounded-xl my-10"
      />
    ),
    code: ({ value }: any) => (
      <>
        {/* React Syntax Highlighter */}
        <div className="my-10">
          <SyntaxHighlighter
            language={value.language}
            style={a11yDark}
            showLineNumbers
            className='rounded-2xl'
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      </>
    ),
    youtube: ({ value }: any) => {
      const { url } = value

      return (
        <div className="my-10">
          <RenderYoutubeVideo url={url} />
        </div>
      )
    },
    quote: ({ value }: any) => (
      <div className="my-10">
        <blockquote cite={value.url} className="p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800">
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
            {value.text}
          </p>
          {value.author && <figcaption>{value.author}</figcaption>}
        </blockquote>
      </div>
    )
  }
}