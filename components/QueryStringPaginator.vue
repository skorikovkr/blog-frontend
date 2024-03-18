<template>
  <div class="pagination space-y-2 pb-8 pt-6 md:space-y-5">
    <nav class="flex justify-between">
      <button
        :class="{ 'cursor-default opacity-50': (data as any).current_page <= 1 }"
        @click="prevPagination"
      >
        {{ $t('pagination.prev') }}
      </button>
      <span>
        {{ currentPage }} {{ $t('pagination.of') }} {{ (data as any).last_page }}
      </span>
      <button
        :class="{ 'cursor-default opacity-50': (data as any).current_page >= (data as any).last_page }"
        @click="nextPagination"
      >
        {{ $t('pagination.next') }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const emits = defineEmits(['optionsChanged']);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const currentPage = computed(() => (route.query['page'] ?? 1));
const perPage = computed(() => (route.query['perPage'] ? route.query['perPage'] : '1'));

const prevPagination = async () => {
  if (props.data.current_page > 1) {
    await router.push({ path: '/', query: { 
      page: (Number(currentPage.value) - 1).toString(),
      perPage: (perPage.value).toString(),
    }})
    emits('optionsChanged', currentPage.value, perPage.value);
  }
}

const nextPagination = async () => {
  if (props.data.current_page < props.data.last_page) {
    await router.push({ path: '/', query: { 
      page: (Number(currentPage.value) + 1).toString(),
      perPage: (perPage.value).toString(),
    }})
    emits('optionsChanged', currentPage.value, perPage.value);
  }
}

watch(perPage, async () => {
  await router.push({ path: '/', query: { 
    page: '1',
    perPage: perPage.value.toString(),
  }})
  emits('optionsChanged', currentPage.value, perPage.value);
})

</script>