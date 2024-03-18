<script lang="ts" setup>
</script>

<template>
  <div class="index-page ">
    <h1 class="text-3xl mb-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      Мой блог
    </h1>
    <p>Блог является одним из моих личных проектов.</p>
    <p>Используемый стек:</p>
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