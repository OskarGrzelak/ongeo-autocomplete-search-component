<template>
  <base-form
    :onSubmit="
      () => {
        search(this.query)
      }
    "
  >
    <search-input
      :placeholder="placeholder"
      :errorText="errorText"
      v-model="query"
      :suggestions="suggestions"
      :searchFor="searchFor"
      @clickSuggestion="setQuery"
    ></search-input>
  </base-form>
</template>

<script>
import axios from 'axios'
import SearchInput from './SearchInput.vue'
export default {
  components: {
    SearchInput,
  },
  props: {
    searchFor: {
      type: String,
      required: true,
      validator(value) {
        return ['address', 'plot'].includes(value)
      },
    },
  },
  data() {
    return {
      query: '',
      errorText: '',
      suggestions: [],
    }
  },
  watch: {
    query(value) {
      if (value) {
        this.getSuggestions(value)
      } else {
        this.suggestions = []
      }
    },
  },
  computed: {
    suggestionsExist() {
      return this.suggestions.length > 0
    },
    apiUrl() {
      if (this.searchFor === 'address')
        return process.env.VUE_APP_ONGEO_ADDRES_API_URL
      if (this.searchFor === 'plot')
        return process.env.VUE_APP_ONGEO_PLOT_API_URL
      return null
    },
    placeholder() {
      if (this.searchFor === 'address') return 'Wyszukaj adres'
      if (this.searchFor === 'plot') return 'Wyszukaj działkę'
      return null
    },
  },
  methods: {
    setQuery(query) {
      this.search(query)
    },
    async search(query) {
      const data = await this.fetchData(query, {
        maxresults: 1,
        additionalData: ['address', 'details'],
      })
      this.query = ''
      this.suggestions = []
      console.log(data)
    },
    async getSuggestions(query) {
      const data = await this.fetchData(query, {
        maxresults: 5,
        additionalData: ['address', 'details'],
      })
      this.suggestions =
        this.searchFor === 'address'
          ? this.getSuggestionsForAddress(data)
          : this.getSuggestionsForPlot(data)
    },
    async fetchData(query, queryOptions) {
      this.errorText = ''
      const queryOptionsString = queryOptions
        ? this.queryOptionsToString(queryOptions)
        : ''
      try {
        if (!query) throw new Error('Proszę wpisać przynajmniej jeden znak.')
        const { data } = await axios(
          `${this.apiUrl}?api_key=${process.env.VUE_APP_ONGEO_API_KEY}&query=${query}${queryOptionsString}`
        )
        return data
      } catch (error) {
        this.errorText = error.message
      }
    },
    queryOptionsToString(options) {
      let optionsStr = ''
      for (const key in options) {
        if (Array.isArray(options[key])) {
          optionsStr += `&${key}=${options[key].join(',')}`
        } else {
          optionsStr += `&${key}=${options[key]}`
        }
      }
      return optionsStr
    },
    getSuggestionsForAddress(data) {
      return data.map((entry) => entry.address)
    },
    getSuggestionsForPlot(data) {
      return data.map((entry) => {
        return {
          ...entry.address,
          plotNumber: entry.details.number,
        }
      })
    },
  },
}
</script>
