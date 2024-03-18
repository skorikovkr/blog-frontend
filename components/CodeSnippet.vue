<script lang="ts">
import hljs from 'highlight.js';

export default {
  props: {
    language: {
      type: String,
      required: false,
      default: null
    },
    className: {
      type: String,
      required: false,
      default: null
    },
    code: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const highlightedCode = computed(() => {
      let result = '';
      if (props.language) {
        result = hljs.highlight(props.code, {language: props.language}).value;
      }
      else {
        result = hljs.highlightAuto(props.code).value;
      }
      return result;
    });

    return () => h('pre', {}, [
      h('code', {
        innerHTML: highlightedCode.value,
        class: 'hljs' + (props.className ? (' ' + props.className) : '')
      }),
    ]);
  }
}
</script>