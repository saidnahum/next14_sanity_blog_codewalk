// quote.js
export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  fields: [
    {
      name: 'text',
      type: 'text', // <= This can also be a Portable Text field
      title: 'Text',
    },
    {
      name: 'author',
      type: 'string', // <= This could be a reference to an author document type, if you had that
      title: 'Author',
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Source on the web',
    }
  ]
}