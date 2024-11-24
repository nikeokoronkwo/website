<script setup lang="ts">
useHead({
  title: "Applications",
});
</script>

<template>
  <div>
    <div
      class="items-center justify-center text-center py-8 text-3xl font-semibold"
    >
      Applications
    </div>
    <div class="flex flex-col w-screen px-5 space-y-5 items-center">
      <AppSummary
        v-for="app in apps"
        :key="app.name"
        :app="app"
      />
    </div>
  </div>
</template>
