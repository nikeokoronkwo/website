<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div id="__app">
    <div class="status-code">
      {{ error?.statusCode ?? 567 }}
    </div>
    <div class="status space-y-2">
      <div class="status-name">{{ error?.name ?? "Unknown Error" }}</div>
      <div class="status-message">
        {{ error?.statusMessage ?? "An unknown error occured" }}
      </div>
      <NuxtLink
        class="py-2 transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 text-lg"
        to="/"
      >
        <div>Go Back</div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Playwrite+AR:wght@100..400&display=swap");

#__app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.status-code {
  font-family: "Playwrite AR", cursive;
  font-optical-sizing: auto;
  font-weight: 200;
  color: transparent;
  -webkit-text-stroke: 1px black;
  font-size: 20vw;
  justify-items: center;
  justify-content: center;
  padding-top: 4rem;
}

.status {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.status-name {
  font-size: xx-large;
  font-weight: 700;
  padding: 1rem;
}

.status-message {
  font-size: large;
}

.button-back {
  padding: 2rem;
  border-color: transparent;
  border-width: 1px;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 150ms;
  transition-property:
    color,
    background-color,
    border-color,
    text-decoration-color,
    fill,
    stroke,
    opacity,
    box-shadow,
    transform,
    filter,
    backdrop-filter,
    -webkit-backdrop-filter;
}

a,
u {
  text-decoration: none;
}

.button-back:hover {
  border-color: black;
}
</style>
