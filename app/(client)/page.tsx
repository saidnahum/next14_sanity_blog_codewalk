import Header from '@/components/Header';
import PostComponent from '@/components/PostComponent';
import { client } from '@/sanity/lib/client'
import { Post } from '@/utils/interface';

const getPosts = async () => {
  const query = `
  *[_type == 'post'] {
    title,
    slug,
    publishAt,
    excerpt,
    _id,
    tags[]->{
      _id,
      slug,
      name
    }
  }
  `;

  const data = await client.fetch(query)

  return data;
}

const Home = async () => {

  const posts: Post[] = await getPosts()
  console.log(posts)

  return (
    <div className="">
      <Header title='Articles'/>

      <div>
        { posts?.length > 0 && posts?.map((post) => (
          <PostComponent post={post} key={post._id}/>
        )) }
      </div>
    </div>
  )
}

export default Home