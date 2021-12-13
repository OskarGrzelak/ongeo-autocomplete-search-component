<template>
  <button
    class="border-2 border-yellow-300 bg-yellow-300 rounded px-2 py-1 font-medium uppercase"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    },
    margin: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    classes() {
      return [this.hidden ? 'hidden md:block' : '', this.margin]
    },
  },
}
</script>
