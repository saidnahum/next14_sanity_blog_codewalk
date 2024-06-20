export interface Post {
  title: string;
  slug: {
    current: string
  };
  publishAt: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  _id: string,
  headings?: String[] | HTMLHeadElement[]
}

export interface Tag {
  name: string;
  slug: {
    current: string
  };
  _id: string
}