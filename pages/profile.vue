<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const { user } = useUserStore();
</script>

<template>
  <div class="profile-container">
    <h1>Profile of {{ user?.email }} {{ user?.role }}</h1>
  </div>
</template>

<style>

</style>