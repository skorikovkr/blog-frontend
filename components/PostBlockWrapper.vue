<template>
  <div class="post-block-wrapper">
    <div class="post-block-slot">
      <slot />
    </div>
    <div class="post-block-controls">
      <select v-model="blockType">
        <option value="text">
          {{ $t('post_block_wrapper.text_block_name') }}
        </option>
        <option value="code">
          {{ $t('post_block_wrapper.code_block_name') }}
        </option>
        <option value="image">
          {{ $t('post_block_wrapper.image_block_name') }}
        </option>
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