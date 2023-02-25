<template>
  <h2>
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: "H2"
}
</script>

<style lang="scss" scoped>
  h2 {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin-top: 5px;
    color: #354f52;
  }
</style>