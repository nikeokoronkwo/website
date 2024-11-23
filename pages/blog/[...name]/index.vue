<script setup lang="ts">
definePageMeta({
  layout: "blog",
});

useHead({
  titleTemplate(title) {
    return `${data.value?.title}`;
  },
});

const route = useRoute();

const colorMode = useColorMode();

// Fetch content
const { data } = await useAsyncData("hello", () =>
  queryContent(
    `/${typeof route.params.name === "string" ? route.params.name : route.params.name.join("/")}`,
  ).findOne(),
);

// Backend for views
const { data: views } = await useFetch(`/api/${data.value?.title}`);

// Update SEO for blog post
useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});

onMounted(async () => {
  // Post new viewer of blog post
  await useFetch(`/api/${data.value?.title}/views`, {
    method: "POST",
  });
});
</script>

<template>
  <div class="min-h-full flex flex-col justify-between">
    <main class="markdown-body">
      <ContentRenderer :value="data ?? {}">
        <template #empty>
          <div
            class="flex flex-col items-center justify-center text-center min-h-fit"
          >
            <p>There's no content here</p>
            <NuxtLink
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg no-underline"
              to="/blog"
              >Blog Home</NuxtLink
            >
          </div>
        </template>
      </ContentRenderer>
    </main>
    <div
      class="text-md text-gray-600 flex flex-col justify-center items-center italic py-5"
    >
      <div>{{ views?.views }} {{ views?.views === 1 ? "View" : "Views" }}</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* CSS for Github Flavoured Markdown */
@import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.7.0/github-markdown-light.css");

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
