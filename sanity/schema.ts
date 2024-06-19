import { type SchemaTypeDefinition } from 'sanity'
import { post } from './schemas/post';
import { tag } from './schemas/tag';
import { youtubeType } from './schemas/youtube';
import quote from './schemas/quote';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post, 
    tag, 
    youtubeType,
    quote
  ],
}
