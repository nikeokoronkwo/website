<script setup lang="ts">
useHead({
  title: "Blog",
});

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(),
);

const items = computed(() =>
  navigation.value?.sort((a, b) => {
    if (a.date && b.date) return 0;
    else {
      const A = new Date(a.date);
      const B = new Date(b.date);
      if (A <= B) return -1;
      else if (A === B) return 0;
      else return 1;
    }
  }),
);
</script>

<template>
  <div class="px-10 py-5 flex flex-col justify-center">
    <div
      class="flex flex-row justify-between items-center border-b-2 border-b-primary-950"
    >
      <div
        class="flex flex-col min-h-[30vh] justify-center items-start space-y-3"
      >
        <div class="text-3xl font-bold">Blog</div>
        <div class="flex flex-col">
          <p class="m-0">
            Just a basic blog of myself, almost like any other blog you'd see
            out there I guess..
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center space-y-5">
        <a
          href="/rss.xml"
          class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow"
          @click="navigateTo('/rss.xml')"
        >
          <img
            src="~/assets/svg/rss.svg"
            class="aspect-square h-14 p-2"
            alt="RSS Feed"
            title="RSS"
          />
        </a>
      </div>
    </div>
    <div class="flex flex-col max-w-screen-md pt-5 space-y-5">
      <div
        v-for="m in items"
        :key="m.title"
        class="px-5 flex flex-row justify-between py-5 border rounded-lg border-primary-900 overflow-hidden shadow-sm max-h-80"
      >
        <div class="flex flex-col space-y-2 justify-evenly max-w-lg">
          <div class="font-bold text-2xl mb-1">
            {{ m.title }}
          </div>
          <div class="text-gray-500 text-sm">
            <div v-if="m.date">{{ new Date(m.date).toDateString() }}</div>
          </div>
          <div class="text-ellipsis overflow-hidden">
            <div v-if="m.description && m.description.length !== 0">
              {{ m.description }}
            </div>
            <div class="italic text-gray-800" v-else>
              No Description Available
            </div>
          </div>
        </div>

        <div class="justify-end flex flex-col items-end">
          <NuxtLink
            :to="`/blog${m._path}`"
            class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
          >
            Read
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
