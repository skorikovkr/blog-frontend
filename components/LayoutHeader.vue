<template>
  <header class="flex items-center justify-between py-10">
    <div>
      <NuxtLink to="/">
        <div class="flex items-center justify-between">
          <div class="mr-3">
            LOGO
          </div>
          <div class="hidden text-xl font-semibold sm:block">
            SITE NAME
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="flex items-center space-x-4 leading-5 sm:space-x-6">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.title"
        :to="link.href"
        class="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
      >
        {{ link.title }}
      </NuxtLink>
      <LocaleSwitcher />
      <ColorModePicker />
    </div>
  </header>
</template>

<script lang="ts" setup>
const navLinks = ref([
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Post',
    href: '/posts/create'
  }
]);
</script>

<style>

</style>