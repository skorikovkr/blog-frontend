<script lang="ts" setup>

const route = useRoute();

const { data, pending } = await useLaravelFetch(`/api/posts/${route.params.slug}`);

</script>

<template>
  <div class="index-page">
    <div 
      v-if="!pending"
      class="post-container" 
    >
      <h1>{{ (data as any).data.title }}</h1>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>