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
      <article>
        <div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header class="pt-6 xl:pb-6">
            <div class="space-y-1 text-center">
              <dl class="space-y-10">
                <div>
                  <dt class="sr-only">Published on</dt>
                  <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time :dateTime="(data as any).data.date">{{ $d((data as any).data.date) }}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {{ (data as any).data.title }}
                </h1>
              </div>
            </div>
          </header>
        </div>
        
        <div class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div class="max-w-none pb-8 pt-10 flex flex-col gap-2">
            <div
              v-for="block in postContent"
              :key="block.id"
              class="post-block"
            >
              <template v-if="block.type == 'image'">
                <ServerImage :src="block.data.src" />
              </template>
              <template v-else-if="block.type == 'paragraph'">
                <p class="">{{ block.data.text }}</p>
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
                  class="text-2xl font-extrabold leading-6 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8 md:text-5xl md:leading-10"
                >
                  {{ block.data.text }}
                </h2>
                <h3 
                  v-else-if="block.data.level === 3"
                  class="text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8 md:text-3xl md:leading-10"
                >
                  {{ block.data.text }}
                </h3>
              </template>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>