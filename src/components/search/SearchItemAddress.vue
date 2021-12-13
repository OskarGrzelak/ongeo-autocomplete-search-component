<template>
  <li class="border-b rounded">
    <button
      class="w-full text-left p-2"
      @click.prevent="handleClickSuggestion()"
      @mouseenter="handleHoverSuggestion()"
    >
      <span class="block"
        >{{ city
        }}<span v-if="street">, {{ street }} {{ houseNumber }}</span></span
      >
      <span class="block text-xs"
        >gm. {{ municipality }}, pow. {{ province }}</span
      >
      <span class="block text-xs">woj. {{ state }}</span>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    id: Number,
    city: String,
    street: String,
    houseNumber: String,
    municipality: String,
    province: String,
    state: String,
  },
  emits: ['click-suggestion', 'hover-suggestion'],
  methods: {
    handleClickSuggestion() {
      this.$emit('click-suggestion', this.id)
    },
    handleHoverSuggestion() {
      this.$emit('hover-suggestion', this.id)
    },
  },
}
</script>
