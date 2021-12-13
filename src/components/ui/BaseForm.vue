<template>
  <form @submit.prevent="onSubmit" class="max-w-screen-sm mx-auto relative flex">
    <slot></slot>
    <base-button hidden margin="ml-4">Szukaj</base-button>
  </form>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
}
</script>
