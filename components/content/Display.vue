<script setup lang="ts">
const target = useTemplateRef("target");
const fixed = useTemplateRef("fixed");

onMounted(() => {
    // setInterval(() =>{
    //     console.group('Scroll Details');
    //     console.log('Left', target.value?.scrollHeight, target.value?.scrollTop);
    //     console.log('Right', fixed.value?.scrollHeight, fixed.value?.scrollTop);
    //     console.log('Page', window.scrollY);
    //     console.groupEnd()
    // }, 1000)
});
</script>

<template>
    <div class="flex items-stretch px-5 space-x-4">
        <div ref="target" class="left">
            <slot />
        </div>
        <div class="text-start sticky self-start right" ref="fixed">
            <ContentSlot :use="$slots.right" unwrap="p" />
        </div>
    </div>
</template>

<style lang="css" scoped>
@media (min-width: 300px) {
    .left {
        padding-right: 2em;
        width: 50%;
        max-width: 700px;
        flex: 0 1 700px;
        color: var(--text-secondary);
    }
}

@media (min-width: 300px) and (min-height: 430px) {
    .right {
        position: sticky;
        top: 12px;
        max-height: calc(100vh - var(--global-header-height) - var(--global-header-warning-height) - 32px);
    }
}

@media (min-width: 300px) {
    .right {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        flex: 0 1 500px;
        width: 50%;
        min-width: 400px;
        max-width: 500px;
    }
}
</style>
