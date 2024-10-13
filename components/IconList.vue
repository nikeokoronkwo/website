<script setup lang="tsx">
const props = defineProps({
  list: Array<RedirectObject>,
  iconSize: {
    type: String,
    optional: true,
  },
  mode: {
    type: Boolean,
    optional: true
  }
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
      :class="'aspect-square py-1 ' + (props.iconSize ?? 'h-10')"
      :alt="l.id"
      :title="l.name"
    />
  </a>
</template>
