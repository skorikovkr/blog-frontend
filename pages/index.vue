<script lang="ts" setup>

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => (Number(route.query['page'] ?? 1)));
const defaultPerPage = 15;
const selectedPerPage = ref(Number(route.query['perPage']) ?? defaultPerPage);
const perPage = computed(() => (Number(route.query['perPage'] ?? defaultPerPage)));

const { data, pending, refresh } = await useLaravelFetch('/api/posts', {
  query: {
    perPage: perPage,
    page: currentPage
  }
});


const prevPagination = async () => {
  await router.push({ path: '', query: { 
    page: (currentPage.value - 1).toString(),
    perPage: (perPage.value).toString(),
  }})
  await refresh();
}

const nextPagination = async () => {
  await router.push({ path: '', query: { 
    page: (currentPage.value + 1).toString(),
    perPage: (perPage.value).toString(),
  }})
  await refresh();
}

watch(selectedPerPage, async () => {
  await router.push({ path: '', query: { 
    page: '1',
    perPage: selectedPerPage.value.toString(),
  }})
  await refresh();
})
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
          <h2>{{ post.title }}</h2>
        </NuxtLink>
      </div>
      <div class="pagination">
        <button v-if="(data as any).current_page > 1" @click="prevPagination">Назад</button>
        <select v-model="selectedPerPage">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button v-if="(data as any).current_page < (data as any).last_page" @click="nextPagination">Вперед</button>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style></style>