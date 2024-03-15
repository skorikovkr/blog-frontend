<template>
  <div class="post-block-wrapper">
    <div class="">
      <slot />
    </div>
    <div class="post-block-controls">
      <select v-model="blockType">
        <option value="text">Текст</option>
        <option value="code">Код</option>
        <option value="image">Изображение</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
});
const emit = defineEmits(['changedBlockType']);
const blockType = ref(props.type);
watch(blockType, () => {
  emit('changedBlockType', props.id, blockType.value);
});
</script>

<style>

</style>