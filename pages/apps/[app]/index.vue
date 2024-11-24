<script setup lang="ts">
const route = useRoute();

const colorMode = useColorMode();

const app = route.params.app as string;
const appInfo = apps.find((p) => p.route === app);

const { data, status, error, refresh, clear } = await useAsyncData(
  "project",
  () =>
    queryContent(`/apps`)
      .where({ _path: `/apps/${app.toLowerCase()}` })
      .sort({ date: 1 })
      .findOne(),
);

const glob = import.meta.glob("~/assets/svg/*", {
  eager: true,
});

function getIconId(id: string) {
  return iconMap.get(id);
}

definePageMeta({
  layout: "content",
});

useHead({
  titleTemplate(title) {
    return `${appInfo?.name} -- Apps by Nike Okoronkwo`;
  },
});

useSeoMeta({
  ogTitle: app,
  description: appInfo?.description,
});
</script>

<template>
  <div class="min-h-lvh flex flex-col min-w-lvw">
    <div
      class="flex flex-row justify-between items-center pl-2 bg-primary-950 w-lvw text-primary-50 py-5"
    >
      <div class="flex flex-col items-start text-start space-y-5 px-5 py-6">
        <div class="py-5 text-5xl font-semibold">{{ appInfo?.name }}</div>
        <div class="text-gray-300">
          {{ appInfo?.description ?? "No description available" }}
        </div>
      </div>
      <div class="flex flex-col items-end text-start space-y-5 px-5">
        <div
          class="items-center justify-center grid grid-cols-2 text-primary-50"
        >
          <IconList :list="appInfo?.directs" dark-mode />
        </div>
        <div class="self-end align-bottom">
          <div
            class="font-medium text-sm whitespace-nowrap overflow-hidden pb-3"
          >
            Downloads
          </div>
          <div class="grid grid-cols-2">
            <div v-for="l in appInfo?.platforms ?? []" :key="l" class="p-3">
              <Icon
                :name="getIconId(l) ?? 'line-md:question'"
                class="scale-150 text-primary-50 px-2 py-2"
                :alt="l"
                data-tooltip-target="tooltip-default"
              />
              <div
                ref="tooltip"
                id="tooltip-default"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                <div class="tooltip-inner-text">
                  {{ l }}
                </div>
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-5">
      <main class="markdown-body">
        <ContentRenderer :value="data ?? {}" v-if="status === 'success'">
          <template #empty>
            <div
              class="flex flex-col items-center justify-center text-center min-h-fit"
            >
              <p>There's no content here</p>
              <NuxtLink
                class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg no-underline"
                to="/apps"
                >Apps</NuxtLink
              >
            </div>
          </template>
        </ContentRenderer>
        <div v-else-if="status === 'pending'">
          <div></div>
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="status === 'error'">
          <div
            class="flex flex-col items-center justify-center text-center min-h-fit max-w-20"
          >
            <div>Error: {{ error?.name }}</div>
            <div>
              <p>There's an error loading content for this page</p>
              <div>{{ error?.message }}</div>
            </div>
            <NuxtLink
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg no-underline"
              to="/apps"
              >Apps</NuxtLink
            >
            <button
              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg no-underline"
              @click="refresh()"
            >
              Refresh
            </button>
          </div>
        </div>
        <div v-else-if="status === 'idle'">Loading...</div>
      </main>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* CSS for Github Flavoured Markdown */
@import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.7.0/github-markdown-light.css");

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  margin: 0;
  padding-right: 45px;
  padding-left: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (max-width: 480px) {
  .markdown-body {
    padding-right: 8px;
    padding-left: 8px;
  }
}

.dark {
  filter: invert(92%) sepia(4%) saturate(30%) hue-rotate(71deg) brightness(106%)
    contrast(96%);
}
</style>
