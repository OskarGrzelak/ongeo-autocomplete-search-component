<template>
  <li class="border-b rounded">
    <button
      class="w-full text-left p-2"
      @click.prevent="handleClickSuggestion()"
      @mouseenter="handleHoverSuggestion()"
    >
      <span class="block"
        >dz. {{ plotNumber
        }}<span
          >, {{ cadastralUnit }}, obr. {{ precinct }} ({{
            precinctNumber
          }})</span
        ></span
      >
      <span class="block text-xs">pow. {{ province }}, woj. {{ state }}</span>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    id: Number,
    province: String,
    state: String,
    cadastralUnit: String,
    plotNumber: String,
    precinct: String,
    precinctNumber: String,
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
