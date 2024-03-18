<script lang="ts" setup>

const route = useRoute();

const { data, pending } = await useLaravelFetch(`/api/posts/${route.params.slug}`);
const postContent = (data as any).value.data.content;
</script>

<template>
  <div class="post-page">
    <div 
      v-if="!pending"
      class="post-container" 
    >
      <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {{ (data as any).data.title }}
      </h1>
      <time>{{ $d((data as any).data.date) }}</time>
      <div
        v-for="block in postContent"
        :key="block.id"
        class="post-block"
      >
        <template v-if="block.type == 'image'">
          <ServerImage :src="block.data.src" />
        </template>
        <template v-else-if="block.type == 'paragraph'">
          <p>{{ block.data.text }}</p>
        </template>
        <template v-else-if="block.type == 'code'">
          <CodeSnippet
            :code="block.data.code" 
            :language="block.data.language"
            class-name="rounded-lg"
          />
        </template>
        <template v-else-if="block.type == 'header'">
          <h2 
            v-if="block.data.level === 2"
            class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            {{ block.data.text }}
          </h2>
          <h3 
            v-else-if="block.data.level === 3"
            class="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            {{ block.data.text }}
          </h3>
        </template>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>