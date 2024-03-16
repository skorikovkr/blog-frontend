<template>
  <select
    :value="locale"
    @change="handleLocaleChange"
  >
    <option
      v-for="l in locales"
      :key="l.code"
    >
      {{ l.code }}
    </option>
  </select>
</template>

<script lang="ts" setup>
const { locale, setLocale, locales, setLocaleCookie } = useI18n()

const handleLocaleChange = async (e: Event) => {
  const target = (e.target) as HTMLSelectElement;
  setLocaleCookie(target.value);
  setLocale(target.value);
}
</script>

<style>

</style>