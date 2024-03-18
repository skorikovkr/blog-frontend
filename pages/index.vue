<script lang="ts" setup>
const { t }  = useI18n()
useSeoMeta({
  title: t('index.meta.title'),
  ogTitle: t('index.meta.title'),
  description: t('index.meta.description'),
  ogDescription: t('index.meta.description')
})
</script>

<template>
  <div class="index-page ">
    <h1 class="text-3xl mb-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {{ $t('index.my_blog') }}
    </h1>
    <p>{{ $t('index.text_1') }}</p>
    <p>{{ $t('index.text_2') }}</p>
    <ul class="pl-5 list-disc list-outside [&_ul]:list-[revert]">
      <li>
        <span>Backend</span>
        <ul>
          <li>Laravel</li>
          <li>nginx</li>
          <li>certbot</li>
          <li>mysql</li>
        </ul>
      </li>
      <li>
        <span>Frontend</span>
        <ul>
          <li>Nuxt</li>
          <li>Tailwind</li>
          <li>highlight.js</li>
          <li>i18n</li>
          <li>Pinia</li>
          <li>Editor.js</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  li {
    margin-left: 2rem;
  }
</style>