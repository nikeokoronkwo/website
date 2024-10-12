<script setup lang="ts">
const colorMode = useColorMode();

useHead({
  titleTemplate(title) {
      return title && title != 'Nike Okoronkwo' ? `${title} | Nike Okoronkwo` : 'Nike Okoronkwo'
  },
  link: [{
    rel: 'icon',
    href: colorMode.value === 'light' ? '/favicon.ico' : '/favicon-dark.ico'
  }, {
    rel: 'apple-touch-icon',
    href: colorMode.value === 'light' ? '/apple-touch-icon.png' : '/apple-touch-icon-dark.png'
  }]
});

useSeoMeta({
  title: "Nike Okoronkwo",
  ogTitle: 'Nikechukwu Okoronkwo',
  description: 'The main homepage of Nikechukwu Okoronkwo'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
