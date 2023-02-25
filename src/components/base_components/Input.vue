<template>
  <input
      type="text"
      :value="modelValue"
      @input="changeValue"
      :max="max"
  >
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    max: [String, Number]
  },
  methods: {
    changeValue(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  flex: 1 1 80%;
  padding: 12px;
  color: #354f52;
  font-weight: 700;
  font-size: 18px;
  border: 1px solid #354f52;
  width: 100%;
  background: transparent;
  outline: 0;
  &::placeholder {
    font-style: italic;
    color: #354f52;
    font-weight: 400;
  }
  &:focus {
    box-shadow: inset 0 0 8px #354f52;
    border: 1px solid #354f52;
  }
}
</style>