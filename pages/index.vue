<script setup lang="ts">
const dialog = ref<HTMLDialogElement>();
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
          What is this?
        </div>
        <div>
          <div class="text-gray-700 text-base max-w-screen-md pb-5 border-b-2">
            <p
              class="m-0 flex flex-col space-y-1 items-center justify-center align-middle"
            >
              <span>
                This is the personal website of Nikechukwu Okoronkwo, a
                solo-developer enjoying what he does. Working on embedded
                software, dart tools and everything in between.
              </span>
              <span>
                On this website, you can find some of the projects I've done, as
                well as the ones I'm currently working on. You can also find my
                blog, where I'll share more of my experience in detail and also
                topics that are important and are usually suitable for
                discussion.
              </span>
              <span>
                If you like what you see you can check this out on my GitHub and
                support me (Patreon below).
              </span>
              <span>In the meantime, have fun! :)</span>
            </p>
          </div>
          <div class="flex flex-col items-center justify-center space-y-3">
            <div
              class="flex flex-row items-center justify-center space-x-6 pt-4"
            >
              <NuxtLink to="/projects">
                <button
                  class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
                >
                  Projects
                </button>
              </NuxtLink>

              <NuxtLink to="/blog">
                <button
                  class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
                >
                  Blog
                </button>
              </NuxtLink>
            </div>
            <button
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-md"
              @click="dialog?.showModal()"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
      <dialog
        ref="dialog"
        class="open:min-w-28 open:min-h-40 open:aspect-square open:flex open:flex-col open:items-center open:justify-center open:space-y-3 rounded-xl"
      >
        <div
          class="p-6 bg-white flex flex-col items-center justify-center align-middle rounded-lg shadow-lg"
        >
          <div class="font-bold text-lg border-b-2">Download Type</div>
          <br />
          <div class="flex flex-col items-center justify-center space-y-2 pb-2">
            <button
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
            >
              PDF
            </button>
            <button
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
            >
              Rich Text
            </button>
          </div>
          <button
            @click="dialog?.close()"
            class="text-sm transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-3 py-1"
          >
            Close
          </button>
        </div>
      </dialog>
    </section>
  </div>
</template>

<style lang="css" scoped>
.anim-typewriter {
  white-space: nowrap;
  overflow: hidden;
  transform: translateY(-50%);
  animation:
    typewriter 2s steps(15) 1s 1 normal both,
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
    width: 9em;
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
