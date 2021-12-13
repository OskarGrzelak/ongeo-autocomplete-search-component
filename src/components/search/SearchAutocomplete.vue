<template>
  <ul v-if="suggestionsExist" class="py-2 absolute top-full w-full bg-white">
    <component
      :is="searchItem"
      v-for="(suggestion, index) in suggestions"
      :key="index"
      v-bind="suggestion"
      :class="{'bg-yellow-400': index == selectedIndex}"
      :id="index"
      @clickSuggestion="handleClickSuggestion"
      @hoverSuggestion="handleHoverSuggestion"
    ></component>
  </ul>
</template>

<script>
import SearchItemAddress from './SearchItemAddress.vue'
import SearchItemPlot from './SearchItemPlot.vue'
export default {
  components: {
    SearchItemAddress,
    SearchItemPlot,
  },
  props: {
    suggestions: Array,
    searchFor: {
      type: String,
      required: true,
      validator(value) {
        return ['address', 'plot'].includes(value)
      },
    },
    selectedIndex: Number
  },
  emits: ['click-suggestion', 'hover-suggestion'],
  computed: {
    searchItem() {
      return `search-item-${this.searchFor}`
    },
    suggestionsExist() {
      return this.suggestions.length > 0
    },
  },
  methods: {
    handleClickSuggestion(id) {
      this.$emit('click-suggestion', id)
    },
    handleHoverSuggestion(id) {
      this.$emit('hover-suggestion', id)
    },
  },
}
</script>