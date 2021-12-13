<template>
  <div class="relative w-full">
    <base-input
      :placeholder="placeholder"
      :errorText="errorText"
      :modelValue="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.down="handleDownArrow"
      @keydown.up="handleUpArrow"
      @keydown.enter="handleEnter($event)"
      @focus="handleFocus"
    ></base-input>
    <search-autocomplete
      v-if="suggestionsExist"
      class="py-2 absolute top-full w-full bg-white"
      :class="{ hidden: closeAutocomplete }"
      :suggestions="suggestions"
      :searchFor="searchFor"
      :selectedIndex="selectedIndex"
      @clickSuggestion="handleClickSuggestion"
      @hoverSuggestion="handleHoverSuggestion"
    >
    </search-autocomplete>
  </div>
</template>

<script>
import SearchAutocomplete from './SearchAutocomplete.vue'
export default {
  components: {
    SearchAutocomplete,
  },
  props: {
    placeholder: String,
    errorText: String,
    modelValue: String,
    suggestions: Array,
    searchFor: {
      type: String,
      required: true,
      validator(value) {
        return ['address', 'plot'].includes(value)
      },
    },
  },
  emits: ['update:modelValue', 'click-suggestion'],
  data() {
    return {
      selectedIndex: -1,
      preventDefaultEnter: false,
      closeAutocomplete: false,
    }
  },
  watch: {
    selectedIndex(value) {
      if (value >= 0) {
        this.preventDefaultEnter = true
      } else {
        this.preventDefaultEnter = false
      }
    },
  },
  computed: {
    searchItem() {
      return `search-item-${this.searchFor}`
    },
    suggestionsExist() {
      return this.suggestions.length > 0
    },
    query() {
      return this.setQueryString()
    },
  },
  methods: {
    handleDownArrow() {
      if (!this.suggestionsExist) return
      if (this.selectedIndex === this.suggestions.length - 1) {
        this.selectedIndex = -1
      } else {
        this.selectedIndex++
      }
    },
    handleUpArrow() {
      if (!this.suggestionsExist) return
      if (this.selectedIndex === -1) {
        this.selectedIndex = this.suggestions.length - 1
      } else {
        this.selectedIndex--
      }
    },
    handleEnter(e) {
      if (this.preventDefaultEnter) {
        e.preventDefault()
        this.$emit('click-suggestion', this.query)
      }
    },
    handleFocus() {
      this.closeAutocomplete = false
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeAutocomplete = true
        this.selectedIndex = -1
      }
    },
    handleClickSuggestion(id) {
      this.setSelectedIndex(id)
      this.$emit('click-suggestion', this.query)
      this.selectedIndex = -1
    },
    handleHoverSuggestion(id) {
      this.setSelectedIndex(id)
    },
    setSelectedIndex(id) {
      this.selectedIndex = id
    },
    setQueryString() {
      const currSuggestion = this.suggestions[this.selectedIndex]
      if (this.searchFor === 'address') {
        return `${currSuggestion.street ? currSuggestion.street : ''}${
          currSuggestion.houseNumber ? ' ' + currSuggestion.houseNumber : ''
        }, ${currSuggestion.city}, gmina ${
          currSuggestion.municipality
        }, powiat ${currSuggestion.province}, województwo ${
          currSuggestion.state
        }`
      } else {
        return `${currSuggestion.plotNumber}, ${currSuggestion.cadastralUnit}, ${currSuggestion.precinct}, ${currSuggestion.precinctNumber}`
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>
