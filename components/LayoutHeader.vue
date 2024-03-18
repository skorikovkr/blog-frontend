<template>
  <header class="flex items-center justify-between py-10">
    <div>
      <NuxtLink to="/">
        <div class="flex items-center justify-between">
          <div class="text-xl font-bold">
            skorikovkr-blog
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="flex items-center space-x-4 leading-5 sm:space-x-6">
      <template
        v-for="link in navLinks"
        :key="link.title"
      >
        <NuxtLink
          v-if="
            (link.href !== '/login' && link.href !== '/logout') || !(link.href === '/login' && userStore.isLoggedIn || link.href === '/logout' && !userStore.isLoggedIn)
          "
          :to="link.href"
          class="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          {{ link.title }}
        </NuxtLink>
      </template>
      <ClientOnly>
        <div class="control-buttons hidden gap-4 sm:flex">
          <LocaleSwitcher />
          <ColorModePicker />
        </div>
        <MobileNav
          :nav-links="navLinks"
        />
      </ClientOnly>
    </div>
  </header>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const { t } = useI18n();

const navLinks = computed(() => [
  {
    title: t('header.nav.links.home_title'),
    href: '/'
  },
  {
    title: t('header.nav.links.posts_title'),
    href: '/posts'
  },
  {
    title: t('header.nav.links.login_title'),
    href: '/login'
  },
  {
    title: t('header.nav.links.logout_title'),
    href: '/logout'
  }
]);
</script>

<style>

</style>