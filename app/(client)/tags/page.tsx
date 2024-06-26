import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface Tag {
  name: string
  slug: {
    current: string
  }
  _id: string,
  postCount: number
}

const getAllTags = async () => {
  const query = `
  *[_type == 'tag']{
    name,
    slug,
    _id,
    'postCount': count(*[_type == 'post' && references('tags', ^._id)])
  }
  `;

  const tags = client.fetch(query);

  return tags;
}

export const revalidate = 60;

const TagsPage = async () => {

  const tags = await getAllTags()

  return (
    <div>
      <Header title='Tags'/>

      <div>
        {tags.length > 0 && tags.map((tag: Tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
            <div className="mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500">
              #{tag.name} ({tag.postCount})
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagsPage