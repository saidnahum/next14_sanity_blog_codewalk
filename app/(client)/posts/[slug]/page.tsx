import CommentForm from "@/components/CommentForm";
import Header from "@/components/Header";
import RenderYoutubeVideo from "@/components/RenderYoutubeVideo";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/utils/helpers";
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
    body,
    'headings': body[style in ['h2', 'h3', 'h4']]
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

      <Toc headings={post?.headings}/>

      <div className={richTextStyles}>
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />

        <CommentForm postId={post._id}/>
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
  prose
  dark:prose-invert
  prose-headings:my-5
  prose-headings:text-left
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
  },
  block: {
    h2: ({value}: any) => (
      <h2 id={slugify(value.children[0].text)} className="text-3xl font-bold mb-3 text-red-500">
        {value.children[0].text}
      </h2>
    ),
    h3: ({value}: any) => (
      <h3 id={slugify(value.children[0].text)} className="text-2xl font-bold mb-3 text-yellow-500">
        {value.children[0].text}
      </h3>
    ),
    h4: ({value}: any) => (
      <h4 id={slugify(value.children[0].text)} className="text-xl font-bold mb-3 text-blue-500">
        {value.children[0].text}
      </h4>
    )
  }
}

const Toc = ({headings}: any) => (
  <div className="my-10 text-center max-w-2xl mx-auto border rounded-sm dark:border-purple-950 p-2">
    <h2 className="text-xl font-bold p-2 mb-5 border-b dark:border-purple-950 bg-amber-50 dark:bg-slate-950/20">Table of Contents</h2>
    <nav>
      <ul className="flex flex-col gap-3">
        {
          headings?.map((heading: any) => (
            <li key={heading?._key}>
              <a className="hover:underline" href={`#${slugify(heading.children[0].text)}`}>
                {heading?.children[0].text}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
)