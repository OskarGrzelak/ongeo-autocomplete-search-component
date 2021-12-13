<template>
  <div class="container mx-auto p-8">
    <search-component></search-component>
  </div>
</template>

<script>
import SearchComponent from './components/search/SearchComponent.vue'
export default {
  name: 'App',
  components: {
    SearchComponent,
  },
}
</script>
