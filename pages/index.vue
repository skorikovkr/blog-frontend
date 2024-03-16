<script lang="ts" setup>

const router = useRouter();
const route = useRoute();

const perPageOptions = ['15', '10', '5', '1'];
const defaultPerPage = perPageOptions[0];
const currentPage = computed(() => (route.query['page'] ?? 1));
const selectedPerPage = ref(route.query['perPage'] ? route.query['perPage'] : defaultPerPage);
const perPage = computed(() => (route.query['perPage'] ? route.query['perPage'] : defaultPerPage));

const { data, pending, refresh } = await useLaravelFetch('/api/posts', {
  query: {
    perPage: perPage,
    page: currentPage
  }
});

const prevPagination = async () => {
  await router.push({ path: '', query: { 
    page: (Number(currentPage.value) - 1).toString(),
    perPage: (perPage.value).toString(),
  }})
  await refresh();
}

const nextPagination = async () => {
  await router.push({ path: '', query: { 
    page: (Number(currentPage.value) + 1).toString(),
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
        <button
          v-if="(data as any).current_page > 1"
          @click="prevPagination"
        >
          {{ $t('pagination.prev') }}
        </button>
        <select v-model="selectedPerPage">
          <option 
            v-for="option in perPageOptions" 
            :key="option" 
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <button
          v-if="(data as any).current_page < (data as any).last_page"
          @click="nextPagination"
        >
          {{ $t('pagination.next') }}
        </button>
      </div>
    </div>
    <div v-else>
      {{ $t('index.loading_text') }}
    </div>
  </div>
</template>

<style></style>