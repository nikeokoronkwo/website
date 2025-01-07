<script setup lang="ts">
const r = useRoute();
const url = r.query.url as string | undefined;
const title = r.query.title as string | undefined;

useHead({
  title,
});

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-screen">
    <div
      class="items-center justify-center text-center py-8 text-3xl font-semibold"
    >
      {{ title ?? 'Form' }}
    </div>
    <div class="py-4">
      <div v-if="!url">
        <div>No Form Available</div>
      </div>
      <iframe
        v-else
        :src="url"
        width="640"
        height="640"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >Loading…</iframe
      >
    </div>
  </div>
</template>
