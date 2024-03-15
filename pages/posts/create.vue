<script lang="ts" setup>
import textarea from '~/presets/wind-full/textarea';
import type { PostBlock } from '~/types/PostBlocks';


const route = useRoute();

//const { data, pending } = await useLaravelFetch(`/api/posts/${route.params.slug}`);
const blockCounter = ref(0);
const content = ref<PostBlock[]>([]);
const title = ref('');
const locale = ref(null);
// const postContent = (data as any).value.data.content.map((block: any) => {
//   blockCounter.value = blockCounter.value + 1;
//   return {
//     id: blockCounter,
//     ...block
//   }
// });

const handleAddBlockClick = () => {
  content.value.push({
    id: blockCounter.value,
    type: 'text',
    content: ''
  });
  blockCounter.value = blockCounter.value + 1;
}

const handleCreatePost = () => {

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
      ['attached-to']: undefined,
      id: id,
      type: 'image'
    };
  }
}
</script>

<template>
  <div class="create-post-page">
    <!-- <div 
      v-if="!pending"
      class="post-container" 
    > -->
    <form @submit.prevent="handleCreatePost">
      <input v-model="title">
      <div
        v-for="block in content"
        :key="block.id"
        class="post-block border-y-2 border-black"
      >
        <PostBlockWrapper :id="block.id" :type="block.type" @changedBlockType="handleChangeBlockType">
          <template v-if="block.type == 'image'">
            <img :src="block.src ?? '/blank-post-photo.png'">
          </template>
          <template v-else-if="block.type == 'text'">
            <textarea v-model="block.content" rows="5" />
          </template>
          <template v-else-if="block.type == 'code'">
            <textarea v-model="block.content" rows="8"/>
            <CodeSnippet
              :code="block.content" 
              :language="block.language"
              class-name="rounded-lg"
            />
          </template>
        </PostBlockWrapper>
      </div>
      <button class="add-block-button" @click="handleAddBlockClick">Добавить блок</button>
    </form>
    <!-- </div>
    <div v-else>
      Загрузка...
    </div> -->
  </div>
</template>

<style></style>