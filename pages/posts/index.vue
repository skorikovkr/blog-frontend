<template>
  <div class="posts-page">
    <NuxtLink to="/posts/create">
      <PrimeButton label="Write new post" />
    </NuxtLink>
    <div 
      v-if="!pending"
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
                Published on
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
              <div class="prose max-w-none text-gray-500 dark:text-gray-400">
                {{ post.description ?? "No description" }}
              </div>
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

<script lang="ts" setup>
const perPage  = ref('5');
const page = ref('1');

const { data, pending, refresh } = await useLaravelFetch('/api/posts', {
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

<style>

</style>