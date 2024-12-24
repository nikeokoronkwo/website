<script setup lang="ts">
const { app: props } = defineProps<{
  app: Application;
}>();

const glob = import.meta.glob("~/assets/svg/*", {
  eager: true,
});

const getImageAbsolutePath = (assetId: string): string => {
  return (glob[`/assets/svg/${assetId}.svg`] ?? { default: "" })["default"];
};

function getIconId(id: string) {
  return iconMap.get(id);
}
</script>

<template>
  <div
    :class="
      !props.inProgress
        ? `w-[70vw] border ${props.status ? 'border-primary-900' : 'border-red-500'} rounded overflow-hidden shadow-sm flex flex-row justify-between py-2`
        : 'bg-primary-50 w-[70vw] border border-primary-900 rounded overflow-hidden shadow-sm flex flex-row justify-between py-2'
    "
  >
    <div class="w-full">
      <div class="px-6 py-2">
        <div
          :class="
            (props.inProgress ? 'flex justify-between items-center' : '') +
            ' font-bold text-xl mb-2'
          "
        >
          <div>{{ props.name }}</div>
          <div
            class="self-end text-sm text-primary-950 italic mt-auto pb-1"
            v-if="props.inProgress"
          >
            in progress
          </div>
          <div
            class="self-end text-sm text-red-500 italic mt-auto pb-1"
            v-else-if="!props.status"
          >
            app unavailable
          </div>
        </div>
        <div class="text-gray-700 text-base py-5">
          <p v-if="props.description">{{ props.description }}</p>
          <span class="text-gray-700 italic" v-else
            >No Description Available</span
          >
        </div>
      </div>
      <div
        class="flex flex-row px-5 py-5 items-center justify-between self-start"
      >
        <div v-if="props.directs">
          <IconList :list="app.directs" />
        </div>
        <NuxtLink
          v-if="props.route"
          :to="`/apps/${app.route ?? app.name}`"
          class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1"
        >
          Check Out More
        </NuxtLink>
        <a
          v-else
          class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1"
        >
          Check Out More
        </a>
      </div>
    </div>
    <div
      v-if="props.platforms"
      class="flex flex-col px-3 py-3 space-y-3 justify-end border border-transparent border-l-1 border-l-primary-950 items-center"
    >
      <div v-for="l in props.platforms" :key="l">
        <Icon v-if="getIconId(l)" :name="getIconId(l)!" class="scale-150" />
        <img
          v-else
          :src="getImageAbsolutePath(l)"
          :class="'aspect-square h-10'"
          :alt="l"
        />
      </div>
    </div>
  </div>
</template>
