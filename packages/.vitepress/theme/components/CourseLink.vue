<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a
    :href="href" target="_blank"
    bg-green:10 px4 py3 rounded-md block mt2 flex items-center gap2 decoration-none
  >
    <div i-carbon:play-filled flex-none text-lg />
    <slot />
  </a>
</template>
