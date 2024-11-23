<script setup lang="ts">
// import type { ParsedContentMeta } from '@nuxt/content';

// interface JSONParsedContent<T> extends ParsedContentMeta {
//   body: T;
// }

// type ParsedContent = JSONParsedContent<Project[]>;

// const { data } = useAsyncData(() => queryContent<ParsedContent>(`projects`).findOne());
// const projects: Project[] = data.value?.body ?? [];

useHead({
  title: "Projects",
});
</script>

<template>
  <div>
    <div
      class="items-center justify-center text-center py-8 text-3xl font-semibold"
    >
      Projects
    </div>
    <div class="flex flex-col w-screen px-5 space-y-5 items-center">
      <ProjectSummary
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>
