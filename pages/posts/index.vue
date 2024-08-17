<script lang="ts" setup>
const { t }  = useI18n()
useSeoMeta({
  title: t('posts.index.meta.title'),
  ogTitle: t('posts.index.meta.title'),
  description: t('posts.index.meta.description'),
  ogDescription: t('posts.index.meta.description')
})

const perPage  = ref('5');
const page = ref('1');

const { data, pending, error, refresh } = await useLaravelFetch('/api/posts', {
  query: {
    page: page,
    perPage: perPage
  }
});

const handleOptionsChanged = async (currentPage: string, per: string) => {
  perPage.value = per;
  page.value = currentPage;
  await refresh();
}
</script>

<template>
  <div class="posts-page">
    <NuxtLink to="/posts/create">
      <PrimeButton :label="$t('posts.index.write_new_post_button')" />
    </NuxtLink>
    <div 
      v-if="!pending && !error"
      class="posts-container flex flex-col justify-center" 
    >
      <ul>
        <li
          v-for="post in (data as any).data"
          :key="post.id"
          class="post-card py-4 "
        >
          <article class="space-y-2 xl:grid xl:grid-cols-6 xl:items-baseline xl:space-y-0 ">
            <dl>
              <dt class="sr-only">
                {{ $t('posts.index.meta.published_on') }}
              </dt>
              <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time :dateTime="post.date">{{ $d(post.date) }}</time>
              </dd>
            </dl>
            <div class="space-y-3 xl:col-span-5">
              <div>
                <h3 class="text-2xl font-bold leading-8 tracking-tight">
                  <NuxtLink
                    class="text-gray-900 dark:text-gray-100"
                    :to="`posts/${post.slug}`"
                  >
                    {{ post.title }}
                  </NuxtLink>
                </h3>
              </div>
              <dl class="prose max-w-none text-gray-500 dark:text-gray-400">
                <dt class="sr-only">
                  {{ $t('index.meta.description_label') }}
                </dt>
                <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <span class="post-description">{{ post.description ?? $t('posts.index.no_description') }}</span>
                </dd>
              </dl>
            </div>
          </article>
        </li>
      </ul>

      <div class="w-full mx-auto sm:w-1/2">
        <QueryStringPaginator 
          :data="data"
          @options-changed="handleOptionsChanged"
        />
      </div>
    </div>
    <div v-else>
      {{ $t('index.loading_text') }}
    </div>
  </div>
</template>

<style>

</style>