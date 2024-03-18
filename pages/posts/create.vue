<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
import { onMounted } from 'vue';
const { locale, locales } = useI18n()

definePageMeta({ middleware: ["auth"] });

const runtimeConfig = useRuntimeConfig();
// i18n has incorrect type of 'locale'
type truei18nLocaleType = {
  name: string,
  code: string
}
// @ts-ignore
const lang = ref<truei18nLocaleType>(locale.value);
const postForm = ref();
const editor = new EditorJS({
  readOnly: false,
  holder: 'editorjs-container',
  tools: {
    header: {
      class: Header,
      config: {
        placeholder: 'Header',
        levels: [2, 3]
      },
      shortcut: 'CMD+SHIFT+H'
    },
    image: FormImage,
    code: {
      class:  CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
  },
});

onMounted(async () => {
  try {
    await editor.isReady;
  } catch (reason) {
    console.log(`Editor.js initialization failed because of ${reason}`)
  }
})

const handleCreatePost = async () => {
  
  try {
    const content = await editor.save();
    const formData = new FormData(postForm.value);
    formData.append('content', JSON.stringify(content.blocks));
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
</script>

<template>
  <div class="create-post-page">
    <form
      id="postForm"
      ref="postForm"
      enctype="multipart/form-data"
      @submit.prevent="handleCreatePost"
    >
      <div class="post-main-info flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <label for="title">{{ $t('create_post.title_label') }}:</label>
          <PrimeInputText 
            id="title"
            class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
            name="title" 
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="description">{{ $t('create_post.description_label') }}:</label>
          <PrimeInputText 
            id="description"
            class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
            name="description" 
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="locale">{{ $t('create_post.lang_selectbox_label') }}:</label>
          <PrimeDropdown 
            id="locale" 
            v-model="lang" 
            :options="locales" 
            option-label="code" 
            class="w-full md:w-14rem" 
          />
        </div>
        <input
          type="text"
          name="locale"
          hidden 
          :value="lang.code"
        >
      </div>

      <div
        id="editorjs-container"
        class="post-content editorjs-container my-6"
      />

      <PrimeButton 
        type="submit" 
        :label="$t('create_post.submit_button_text')"
      />
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