<template>
  <header class="converter">
    <section class="converter__original">
      <H2>I change</H2>
      <form @submit.prevent>
        <Select
            v-if="availableCurrencies.length !== 0"
            :model-value="originalCurrency"
            @update:model-value="updateOriginalCurrency"
            :options="availableCurrencies"
        ></Select>
        <Input
            name="original-input"
            v-model="originalCurrencyValue"
            @input="calculateValue"
            :max="maxRangeFrom"
        />
      </form>
    </section>
    <section class="converter__desired">
      <H2>I receive</H2>
      <form @submit.prevent>
        <Select
            v-if="availableCurrencies.length !== 0"
            :model-value="desiredCurrency"
            @update:model-value="updateDesiredCurrency"
            :options="availableCurrencies"
        ></Select>
        <Input
            name="desired-input"
            :model-value="desiredCurrencyValue"
            @update:model-value="showInfo"
            @input="calculateValue"
            :max="maxRangeTo"
        />
      </form>
    </section>
  </header>
</template>

<script>
import Select from "@/components/base_components/Select.vue";
import Input from "@/components/base_components/Input.vue";
import H2 from "@/components/base_components/H2.vue";

export default {
  components: {
    H2,
    Input,
    Select
  },
  name: 'Converter',
  props: {
    availableCurrencies: Array,
    originalCurrency: String,
    desiredCurrency: String,
    currenciesValues: Object
  },
  data() {
    return {
      originalCurrencyValue: 1,
      desiredCurrencyValue: '',
      maxUSD: 10000,
      maxRangeFrom: '',
      maxRangeTo: '',
    }
  },
  methods: {
    showInfo(e) {
      this.desiredCurrencyValue = e
    },
    updateOriginalCurrency(val) {
      this.$emit('updateOriginalCurrency', val)
    },
    updateDesiredCurrency(val) {
      this.$emit('updateDesiredCurrency', val)
    },
    calculateValue(event) {
      if (event.target.name === 'original-input') {
        if (event.target.value > this.getMaxRangeFrom) {
          event.target.value = this.getMaxRangeFrom
          this.originalCurrencyValue = event.target.value
        }
        this.desiredCurrencyValue = (+this.originalCurrencyValue * this.getCoeffTo / this.getCoeffFrom)
      } else {
        if (event.target.value > this.getMaxRangeTo) {
          event.target.value = this.getMaxRangeTo
          this.desiredCurrencyValue = event.target.value
        }
        this.originalCurrencyValue = (+this.desiredCurrencyValue / this.getCoeffTo * this.getCoeffFrom)
      }
    },
  },
  computed: {
    getCoeffFrom() {
      return this.currenciesValues[this.originalCurrency]
    },
    getCoeffTo() {
      return this.currenciesValues[this.desiredCurrency]
    },
    getMaxRangeFrom() {
      return this.maxRangeFrom = this.maxUSD * this.currenciesValues[this.originalCurrency]
    },
    getMaxRangeTo() {
      return this.maxRangeTo = this.maxUSD * this.currenciesValues[this.desiredCurrency]
    },
  },
  watch: {
    originalCurrency(newVal) {
      if (this.getCoeffTo && this.getCoeffFrom) {
        if (this.originalCurrencyValue > this.getMaxRangeFrom) {this.originalCurrencyValue = this.getMaxRangeFrom}
        this.desiredCurrencyValue = (this.originalCurrencyValue * this.currenciesValues[this.desiredCurrency] / this.currenciesValues[newVal])
      }
    },
    desiredCurrency(newVal) {
      if (this.getCoeffTo && this.getCoeffFrom) {
        if (this.desiredCurrencyValue > this.getMaxRangeTo) {this.desiredCurrencyValue = this.getMaxRangeTo}
        this.originalCurrencyValue = +this.desiredCurrencyValue / this.currenciesValues[newVal] * this.currenciesValues[this.originalCurrency]
      }
    },
    currenciesValues() {
      this.desiredCurrencyValue = (+this.originalCurrencyValue * this.getCoeffTo / this.getCoeffFrom)
    }
  },
}
</script>

<style lang="scss" scoped>
.converter {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 10px;
  &__original,
  &__desired {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;
    & form {
      width: 100%;
      display: flex;
    }
  }
}
@media (min-width: 600px) {
  .converter {
    flex-direction: row;
  }
}
</style>