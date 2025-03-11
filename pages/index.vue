<script setup lang="ts">
const langs = ['cplusplus', 'dart', 'swift', 'typescript']
</script>

<template>
  <div>
    <section
      class="flex flex-col items-center justify-center min-h-screen w-screen"
    >
      <div
        class="flex flex-col items-center justify-center text-center align-middle px-5 content-center py-2"
      >
        <div
          class="font-bold font-mono -z-10 min-[375px]:text-3xl md:text-5xl lg:text-6xl md:py-6 anim-typewriter"
        >
          Nikechukwu Okoronkwo
        </div>
        <div>
          <div class="text-gray-700 text-base max-w-screen-md pb-5 border-b-2">
            <p
              class="m-0 flex flex-col space-y-1 items-center justify-center align-middle"
            >
              <span>
                Powerful Engineer by day, Innovative Developer by night
              </span>
              <!-- <span>
                Working on
              </span> -->
            </p>
          </div>
          <div class="flex flex-row justify-between items-center space-x-3 my-6">
            <div v-for="lang in langs" :key="lang">
              <Icon
                class="scale-[3] px-5"
                :name="iconMap.get(lang)"
              />
            </div>
          </div>
          <div class="flex flex-col items-center justify-center space-y-3">
            <div
              class="flex flex-row items-center justify-center space-x-6 pt-4"
            >
              <NuxtLink to="/projects" prefetch>
                <button
                  class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
                >
                  Projects
                </button>
              </NuxtLink>

              <NuxtLink to="/blog" prefetch>
                <button
                  class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
                >
                  Blog
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <!-- <LazyResumeDialog /> -->
    </section>
  </div>
</template>

<style lang="css" scoped>
.anim-typewriter {
  white-space: nowrap;
  overflow: hidden;
  transform: translateY(-50%);
  animation:
    typewriter 3s steps(25) 1s 0.9 normal both,
    blinkTextCursor 500ms steps(14) infinite normal;
}

@media (min-width: 375px) {
  .anim-typewriter {
    margin-top: 2rem;
  }
}

@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 15em;
  }
}

@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  to {
    border-right-color: transparent;
  }
}
</style>
