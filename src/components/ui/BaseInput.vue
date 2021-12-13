<template>
  <div class="relative w-full">
    <input
      type="text"
      :placeholder="placeholder"
      class="border-2 border-yellow-300 rounded px-2 py-1 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
    />
    <p v-if="errorText" class="absolute text-xs pl-2 font-medium text-red-500">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    errorText: String,
    modelValue: String,
    autocomplete: Boolean,
    suggestions: Array,
    searchFor: String,
  },
  emits: ['update:modelValue', 'blur', 'focus'],
}
</script>
