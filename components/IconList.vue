<script setup lang="tsx">
const props = defineProps({
  list: Array<RedirectObject>,
  iconSize: {
    type: String,
    optional: true,
  },
  darkMode: {
    type: Boolean,
    optional: true,
  },
});

const glob = import.meta.glob("~/assets/svg/*", {
  eager: true,
});

const getImageAbsolutePath = (assetId: string): string => {
  return glob[`/assets/svg/${assetId === "pub" ? "dart" : assetId}.svg`][
    "default"
  ];
};
</script>

<template>
  <a
    v-for="l in props.list"
    :key="l.id"
    :href="l.email ? `mailto:${l.url}` : l.url"
    target="_blank"
  >
    <img
      :src="getImageAbsolutePath(l.id)"
      :class="'aspect-square py-1 ' + (props.iconSize ?? 'h-10') + (props.darkMode ? ' dark' : '')"
      :alt="l.id"
      :title="l.name"
    />
  </a>
</template>

<style lang="css" scoped>
.dark {
  filter: invert(92%) sepia(4%) saturate(30%) hue-rotate(71deg) brightness(106%) contrast(96%);
}
</style>