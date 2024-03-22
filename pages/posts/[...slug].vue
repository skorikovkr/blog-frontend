<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const { start, finish } = useLoadingIndicator();
const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const route = useRoute();
const userStore = useUserStore();
const { data, pending } = await useLaravelFetch(`/api/posts/${route.params.slug}`);
  
const post = (data as any).value.data;
const postContent = (data as any).value.data.content;

const confirmDelete = () => {
    confirm.require({
        message: t('posts.concrete_post.confirm_delete_dialog'),
        header: t('posts.concrete_post.confirm_delete_header'),
        icon: 'pi pi-info-circle',
        rejectLabel: t('posts.concrete_post.confirm_delete_reject'),
        acceptLabel: t('posts.concrete_post.confirm_delete_accept'),
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
          start();
          try {
            await $laravelFetch(`/api/posts/${post.id}`, {
              method: 'delete'
            });
          } catch (error) {
            toast.add({ 
              severity: 'error', 
              summary: t('posts.concrete_post.toast_delete_rejected_summary'), 
              detail: t('posts.concrete_post.toast_delete_rejected_detail'), 
              life: 3000 
            });
          }
          finish();
          toast.add({ 
            severity: 'info', 
            summary: t('posts.concrete_post.toast_delete_confirmed_summary'), 
            detail: t('posts.concrete_post.toast_delete_confirmed_detail'), 
            life: 3000 
          });
        }
    });
};

</script>

<template>
  <div class="post-page">
    <!-- SEO -->
    <Head>
      <Title>{{ post.title }}</Title>
      <Meta name="description" :content="post.description" />
    </Head>
    <!-- SEO -->
    
    <div 
      v-if="!pending"
      class="post-container" 
    >
      <PrimeToast position="bottom-right" />
      <PrimeConfirmDialog>
        <template #message="slotProps">
          <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
            <p>{{ slotProps.message.message }}</p>
          </div>
        </template>
      </PrimeConfirmDialog>
      <article>
        <div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header class="pt-6 xl:pb-6">
            <div class="space-y-1 text-center">
              <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {{ post.title }}
              </h1>
              <dl class="space-y-10">
                <div>
                  <dt class="sr-only">
                    {{ $t('posts.index.meta.published_on') }}
                  </dt>
                  <dd class="text-base my-2 font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time :dateTime="post.date">{{ $d(post.date) }}</time>
                  </dd>
                  <dt class="sr-only">
                    {{ $t('index.meta.description_label') }}
                  </dt>
                  <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <span class="post-description block max-w-xl mx-auto">{{ post.description }}</span>
                  </dd>
                </div>
              </dl>
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
                <p class="post-paragraph" v-html="sanitizeHTML(block.data.text)"></p>
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
                  v-html="sanitizeHTML(block.data.text)"
                />
                <h3 
                  v-else-if="block.data.level === 3"
                  class="text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8 md:text-3xl md:leading-10"
                  v-html="sanitizeHTML(block.data.text)"
                />
              </template>
            </div>
          </div>
          <PrimeButton
            v-if="userStore.isLoggedIn && (userStore.user!.id == post.author_id || userStore.user?.roles.find(r => r.name === 'Admin'))"
            severity="danger" 
            :label="$t('posts.index.delete_post')" 
            @click="confirmDelete"
          />
        </div>
      </article>
    </div>
    <div v-else>
      {{ $t('index.loading_text') }}
    </div>
  </div>
</template>