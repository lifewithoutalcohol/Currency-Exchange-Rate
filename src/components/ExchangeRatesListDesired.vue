<template>
  <article
      v-for="cur of availableCurrencies"
      :key="cur[0]"
      class="desired__content"
  >
    1 <span>({{ exchangeRatesSelected }})</span> = {{ exchangeRatesList[cur.symbol] }} <span>({{ cur.symbol }})</span>
  </article>
</template>

<script>
export default {
  name: "ExchangeRatesListDesired",
  props: {
    availableCurrencies: Array,
    exchangeRatesSelected: String,
    exchangeRatesList: Object,
  },
}
</script>

<style lang="scss" scoped>
.desired__content {
  display: flex;
  border: 1px solid #354f52;
  margin: 2px auto;
  padding: 4px 10px;
  & span {
    font-weight: 700;
    padding: 0 5px;
  }
}
</style>