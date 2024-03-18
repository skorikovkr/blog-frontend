<script setup lang="ts">

</script>

<template>
  <div class="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
    <section class="mx-auto max-w-3xl h-full px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div class="flex min-h-screen flex-col justify-between font-sans">
        <LayoutHeader />
        <main class="mb-auto flex-1">
          <slot />
        </main>
        <LayoutFooter />
      </div>
    </section>
  </div>
</template>