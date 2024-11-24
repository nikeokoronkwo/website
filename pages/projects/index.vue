<script setup lang="ts">
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
