<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

defineProps<{
  src: string
}>();

</script>

<template>
  <img :src="runtimeConfig.public.imageBaseUrl + src">
</template>

<style>

</style>