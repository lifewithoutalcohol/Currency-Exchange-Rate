<template>
  <section class="all-exchange-rates__list">
    <section class="all-exchange-rates__interest">
      <ExchangeRatesListInterest
          :exchangeRatesSelected="exchangeRatesSelected"
          @changeRates="changeRates"
      />
    </section>
    <section class="all-exchange-rates__desired">
      <ExchangeRatesListDesired
          :exchangeRatesSelected="exchangeRatesSelected"
          :availableCurrencies="availableCurrencies"
          :exchangeRatesList="exchangeRatesList"
      />
    </section>
  </section>

</template>

<script>
import ExchangeRatesListInterest from "@/components/ExchangeRatesListInterest.vue";
import ExchangeRatesListDesired from "@/components/ExchangeRatesListDesired.vue";

export default {
  name: "ExchangeRatesList",
  components: {
    ExchangeRatesListDesired,
    ExchangeRatesListInterest
  },
  props: {
    availableCurrencies: Array,
    exchangeRatesSelected: String,
    exchangeRatesList: Object,
  },
  methods: {
    changeRates(val) {
      this.$emit('changeRates', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.all-exchange-rates {
  &__list {
    width: 100%;
    flex: 1 1 auto;
  }
  &__interest {
    border: 1px solid #354f52;
    padding: 5px 10px;
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}
</style>