<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div
    :class="`flex flex-col justify-center items-center w-full min-h-screen ${colorMode.value === 'light' ? 'light-mode' : 'light-mode'}`"
  >
    <div class="h-14 py-5 flex flex-row justify-between">
      <NuxtLink to="/" class="pb-5">
        <div class="highlight-font text-2xl pl-5">nikechukwu</div>
      </NuxtLink>
    </div>
    <slot class="h-full" />
    <footer class="flex flex-col justify-center items-center bottom-0">
      <small
        :class="`flex flex-col justify-center items-center ${colorMode.value === 'light' ? 'text-gray-700' : 'text-gray-700'}`"
      >
        <span>(C) Nikechukwu Okoronkwo 2024</span>
        <FootNote />
      </small>
      <div
        :class="`flex flex-row space-x-3 ${colorMode.value === 'light' ? '' : /*'filter-to-dark'*/ ''}`"
      >
        <IconList :list="links" />
      </div>
    </footer>
  </div>
</template>

<style lang="css" scoped>
.light-mode {
  background-color: transparent;
}

.dark-mode {
  background-color: #0e1116;
  color: azure;
}

.filter-to-dark {
  filter: invert(100%) sepia(0%) saturate(7443%) hue-rotate(183deg)
    brightness(89%) contrast(120%);
}
</style>
