<template>
  <select :value="modelValue" @change="changeOption">
    <option
        v-for="option in options"
        :key="option.id"
        :value="option.symbol"
    >
      {{ option.symbol }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
select {
  flex: 1 1 20%;
  background: #52796f;
  color: #CAD2C5;
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  text-align: center;
  border: 1px solid #354f52;
  max-width: 100px;
}
</style>