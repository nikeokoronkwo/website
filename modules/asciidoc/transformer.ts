import { defineTransformer } from '@nuxt/content/transformers'
import Asciidoctor from 'asciidoctor';

export default defineTransformer({
  name: 'asciidoc-transformer',
  extensions: ['.adoc', '.ad', '.asciidoc'],
  //@ts-expect-error
  parse(_id: string, rawContent: string) {
    const parsed = typeof Asciidoctor().convert(rawContent) === 'string' 
      ? Asciidoctor().convert(rawContent, { attributes: { showTitle: true } }) : Asciidoctor().convert(rawContent);

    return {
      _id,
      body: parsed
    }
  }
})

