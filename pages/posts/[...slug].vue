<script lang="ts" setup>

const route = useRoute();

const { data, pending } = await useLaravelFetch(`/api/posts/${route.params.slug}`);
let blockCounter = 0;
const postContent = (data as any).value.data.content.map((block: any) => {
  blockCounter++;
  return {
    id: blockCounter,
    ...block
  }
});
</script>

<template>
  <div class="post-page">
    <div 
      v-if="!pending"
      class="post-container" 
    >
      <h1>{{ (data as any).data.title }}</h1>
      <time>{{ (data as any).data.date }}</time>
      <div
        v-for="block in postContent"
        :key="block.id"
        class="post-block"
      >
        <template v-if="block.type == 'image'">
          <ServerImage :src="block.src" />
        </template>
        <template v-else-if="block.type == 'text'">
          <p>{{ block.content }}</p>
        </template>
        <template v-else-if="block.type == 'code'">
          <CodeSnippet
            :code="block.content" 
            :language="block.language"
            class-name="rounded-lg"
          />
        </template>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>