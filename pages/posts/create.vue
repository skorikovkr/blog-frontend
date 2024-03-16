<script lang="ts" setup>
import textarea from '~/presets/wind-full/textarea';
import type { ImagePostBlock, PostBlock } from '~/types/PostBlocks';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const blockCounter = ref(0);
const content = ref<PostBlock[]>([]);
const serializedContent = ref('[]');
const title = ref('');
const locale = ref('ru-RU');
const postForm = ref();

const handleAddBlockClick = () => {
  content.value.push({
    id: blockCounter.value,
    type: 'text',
    content: ''
  });
  blockCounter.value = blockCounter.value + 1;
}

const handleCreatePost = async () => {
  serializedContent.value = JSON.stringify(content.value);
  await nextTick();
  const formData = new FormData(postForm.value);
  try {
    const { data } = await $laravelFetch(runtimeConfig.public.backendUrl + '/api/posts', {
      method: 'POST',
      body: formData
    });
    navigateTo(`/posts/${data.slug}`);
  } catch (error) {
    // TODO: highlight validation errors
    console.log(error);
  }
}

const handleChangeBlockType = (id: number, type: string) => {
  const i = content.value.findIndex(el => el.id == id);
  if (type == 'text') {
    content.value[i] = {
      content: '',
      id: id,
      type: 'text'
    };
  } else if (type == 'code') {
    content.value[i] = {
      content: '',
      id: id,
      type: 'code'
    };
  } else if (type == 'image') {
    content.value[i] = {
      src: undefined,
      ['attached_to']: 'image_' + id.toString(),
      id: id,
      type: 'image'
    };
  }
}

const handleImageChange = (id: number, e: Event) => {
  const file = ((e.target) as HTMLInputElement).files!.item(0);
  if (file) {
    const i = content.value.findIndex(el => el.id == id);
    content.value[i] = {
      ...(content.value[i] as ImagePostBlock),
      src: URL.createObjectURL(file),
    };
 }
}
</script>

<template>
  <div class="create-post-page">
    <form ref="postForm" id="postForm" enctype="multipart/form-data" @submit.prevent="handleCreatePost">
      <div class="post-main-info">
        <label for="title">Введите заголовок статьи</label>
        <input id="title" name="title" v-model="title">
        <label for="locale">Выберите язык</label>
        <select id="locale" name="locale" v-model="locale">
          <option value="ru-RU">ru-RU</option>
          <option value="en-US">en-US</option>
        </select>
        <input name="content" hidden :value="serializedContent">
        <input type="submit" value="Запостить статью">
      </div>
      <div
        v-for="block in content"
        :key="block.id"
        class="post-block border-y-2 border-black"
      >
        <PostBlockWrapper
          :id="block.id"
          :type="block.type"
          @changed-block-type="handleChangeBlockType"
        >
          <template v-if="block.type == 'image'">
            <img :src="block.src ?? '/blank-post-photo.png'">
            <div class="image-container relative">
              <label :for="'image_' + block.id">Выбрать изображение...</label>
              <input 
                :id="'image_' + block.id" 
                class="image-input" 
                type="file" 
                :name="'image_' + block.id" 
                accept="image/png, image/jpeg"
                @change="(e: Event) => handleImageChange(block.id, e)"
              >
            </div>
          </template>
          <template v-else-if="block.type == 'text'">
            <textarea
              v-model="block.content"
              rows="5"
              class="w-full"
            />
          </template>
          <template v-else-if="block.type == 'code'">
            <textarea
              v-model="block.content"
              rows="8"
              class="w-full"
            />
            <CodeSnippet
              :code="block.content" 
              :language="block.language"
              class-name="rounded-lg"
            />
          </template>
        </PostBlockWrapper>
      </div>
      <button
        class="add-block-button"
        @click="handleAddBlockClick"
        type="button"
      >
        Добавить блок
      </button>
    </form>
  </div>
</template>

<style scoped>
label {
   cursor: pointer;
}

.image-input {
  display: none;
}
</style>