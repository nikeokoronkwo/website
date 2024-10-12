<script setup lang="ts">
const colorMode = useColorMode();

useHead({
  link: [{
    rel: 'icon',
    href: colorMode.value === 'light' ? '/favicon.ico' : '/favicon-dark.ico'
  }, {
    rel: 'apple-touch-icon',
    href: colorMode.value === 'light' ? '/apple-touch-icon.png' : '/apple-touch-icon-dark.png'
  }]
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
