<template>
  <h3 class="interest-text">Choose currency</h3>
    <Select
        :model-value="exchangeRatesSelected"
        @update:model-value="changeRates"
        :options="exchangeRatesOptions"
    ></Select>
</template>

<script>
import Select from "@/components/base_components/Select.vue";
export default {
  components: {
    Select
  },
  name: "ExchangeRatesListInterest",
  props: {
    exchangeRatesSelected: String,
  },
  data() {
    return {
      exchangeRatesOptions: [
        {symbol: "USD", id: 1},
        {symbol: "EUR", id: 2},
        {symbol: "UAH", id: 3}
      ],
    }
  },
  methods: {
    changeRates(val) {
      this.$emit('changeRates', val)
    }

  }
}
</script>

<style lang="scss" scoped>
.interest-text {
  flex: 1 1 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  font-size: 18px;
  flex-wrap: wrap;
}
</style>