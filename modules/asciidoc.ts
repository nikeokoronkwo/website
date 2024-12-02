import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup (_options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    
    nuxt.hook('content:context', (contentContext) => {
      contentContext.transformers.push(resolve('./asciidoc/transformer.ts'))
    })
  }
})

