<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import CodeTool from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import { onMounted } from 'vue';
const { locale, locales } = useI18n()

const runtimeConfig = useRuntimeConfig();
const title = ref('');
const lang = ref(locale.value);
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
      <div class="post-main-info">
        <label for="title">{{ $t('create_post.title_label') }}</label>
        <input
          id="title"
          v-model="title"
          name="title"
        >
        <label for="locale">{{ $t('create_post.lang_selectbox_label') }}</label>
        <select
          id="locale"
          v-model="lang"
          name="locale"
        >
          <option
            v-for="l in locales"
            :key="l.code"
          >
            {{ l.code }}
          </option>
        </select>
        <input
          type="submit"
          :value="$t('create_post.submit_button_text')"
        >
      </div>

      <div id="editorjs-container" class="post-content editorjs-container"></div>
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