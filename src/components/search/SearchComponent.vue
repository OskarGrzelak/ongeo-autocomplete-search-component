<template>
  <search-form v-if="searchForAddress" searchFor="address"></search-form>
  <search-form v-else searchFor="plot"></search-form>
  <div class="text-center my-4">
    <p class="mb-4">lub</p>
    <base-button
      @click="setSearchOption"
      class="border-2 border-yellow-300 bg-yellow-300 rounded px-2 py-1 font-medium uppercase"
    >
      {{ buttonText }}
    </base-button>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
export default {
  components: {
    SearchForm,
  },
  data() {
    return {
      searchForAddress: true,
    }
  },
  computed: {
    buttonText() {
      return this.searchForAddress ? 'Wyszukaj działkę' : 'Wyszukaj adres'
    },
  },
  methods: {
    setSearchOption() {
      this.searchForAddress = !this.searchForAddress
    },
  },
}
</script>
