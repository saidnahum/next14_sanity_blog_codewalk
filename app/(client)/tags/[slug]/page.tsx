import Header from '@/components/Header'
import PostComponent from '@/components/PostComponent';
import { client } from '@/sanity/lib/client';
import { Post } from '@/utils/interface';

interface Params {
  params: {
    slug: string
  }
}

const getPostsByTag = async (tag: string) => {
  const query = `
  *[_type == 'post' && references(*[_type == 'tag' && slug.current == "${tag}"]._id)]{
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
  }
  `;

  const posts = await client.fetch(query);

  return posts;
}

export const revalidate = 60;

const TagPageBySlug = async ({params}: Params) => {

  const posts = await getPostsByTag(params.slug)

  console.log(posts)

  return (
    <div>
      <Header title={`#${params.slug}`} tags/>

      <div>
        {
          posts.length > 0 && posts.map((post: Post) => (
            <PostComponent
              key={post._id}
              post={post}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TagPageBySlug