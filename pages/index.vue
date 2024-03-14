<script lang="ts" setup>

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => (Number(route.query['page'] ?? 1)));

const { data, pending, refresh } = await useLaravelFetch('/api/posts', {
  query: {
    perPage: route.query['perPage'],
    page: currentPage
  }
});


const prevPagination = async () => {
  await router.push({ path: '', query: { 
    page: (currentPage.value - 1).toString(),
    perPage: route.query['perPage'],
  }})
  await refresh();
}

const nextPagination = async () => {
  await router.push({ path: '', query: { 
    page: (currentPage.value + 1).toString(),
    perPage: route.query['perPage'],
  }})
  await refresh();
}
</script>

<template>
  <div class="index-page">
    <h1>Статьи</h1>
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
          {{ post.title }}
        </NuxtLink>
      </div>
      <div class="pagination">
        <button v-if="(data as any).current_page > 1" @click="prevPagination">Назад</button>
        <button v-if="(data as any).current_page < (data as any).last_page" @click="nextPagination">Вперед</button>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>