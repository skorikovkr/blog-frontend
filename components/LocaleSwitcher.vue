<template>
  <PrimeDropdown 
    :value="locale" 
    :options="locales" 
    option-label="name" 
    :pt="dropdownPT"
    @change="handleLocaleChange"
  >
    <template #value>
      <div class="flex align-items-center">
        <div class="flex align-items-center">
          <img
            :src="'/'+locale.slice(0,2)+'.svg'"
            width="20"
            height="20"
            class="mr-1"
          >
          {{ locale }}
        </div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center gap-1">
        <img
          :src="'/'+slotProps.option.code.slice(0,2)+'.svg'"
          width="20"
          height="20"
        >
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </PrimeDropdown>
</template>

<script lang="ts" setup>
const { locale, setLocale, locales, setLocaleCookie } = useI18n()

const dropdownPT = {
  root: ({ props, state }: any) => ({
    class: [
      'inline-flex',
      'relative',
      'w-fit',  // changed width compared to default styles
      'rounded-md',
      'shadow-sm',
      'bg-surface-0 dark:bg-surface-900',
      { 'ring-1 ring-inset ring-surface-300 dark:ring-surface-700': !state.focused, 'ring-2 ring-inset ring-primary-500 dark:ring-primary-400': state.focused },
      'cursor-default',
      'select-none',
      { 'opacity-60': props.disabled, 'pointer-events-none': props.disabled }
    ]
  }),
  trigger: {
    class: 'hidden'
  }
};

const handleLocaleChange = async (e: any) => {
  setLocaleCookie(e.value.code);
  setLocale(e.value.code);
}
</script>

<style>

</style>