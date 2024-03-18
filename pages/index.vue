<script lang="ts" setup>
const perPage  = ref('1');
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

<template>
  <div class="index-page">
    <div 
      v-if="!pending"
      class="posts-container" 
    >
      <div
        v-for="post in (data as any).data"
        :key="post.id"
        class="post-card" 
      >
        <NuxtLink :to="`posts/${post.slug}`">
          <h2>{{ post.title }}</h2>
        </NuxtLink>
      </div>
      <QueryStringPaginator 
        :data="data"
        @options-changed="handleOptionsChanged"
      />
    </div>
    <div v-else>
      {{ $t('index.loading_text') }}
    </div>
  </div>
</template>

<style></style>