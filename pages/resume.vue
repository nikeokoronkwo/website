<script setup lang="ts">
const { data, pending, error, refresh } = await useAsyncData(
    'resume',
    () => queryContent('resume').findOne()
);

onMounted(() => console.log(data.value))
</script>

<template>
    <div v-html="data?.body"></div>
</template>