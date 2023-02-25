<template>
  <section @click="hideMenu" class="wrapper">
    <TheConverter
        :availableCurrencies="availableCurrencies"
        :originalCurrency="originalCurrency"
        :desiredCurrency="desiredCurrency"
        :currenciesValues="currenciesValues"
        @updateOriginalCurrency="updateOriginalCurrency"
        @updateDesiredCurrency="updateDesiredCurrency"
    />
    <TheExchangeRates
        :isDisabledUpdate="isDisabledUpdate"
        :exchangeRatesSelected="exchangeRatesSelected"
        :availableCurrencies="availableCurrencies"
        :getCurrencySymbols="getCurrencySymbols"
        :isHiddenMenu="this.isHiddenMenu"
        @changeIsHiddenMenu="this.isHiddenMenu = !this.isHiddenMenu"
        @changeRates="changeRates"
        @postCurrency="postCurrency"
        @updateRate="updateRate"
    />
  </section>
</template>

<script>
  import axios from "axios";
  import TheConverter from "@/components/TheConverter.vue";
  import TheExchangeRates from "@/components/TheExchangeRates.vue";

  export default {
    components: {
      TheExchangeRates,
      TheConverter,
    },
    data() {
      return {
        originalCurrencyValue: 1,
        desiredCurrencyValue: '',
        originalCurrency: 'USD',
        desiredCurrency: 'BTC',
        availableCurrencies: [],
        currenciesValues: [],

        isHiddenMenu: true,
        exchangeRatesSelected: 'USD',

        isDisabledUpdate: false
      }
    },
    methods: {
      async updateRate(){
        await this.getCourseCurrency()
        this.isDisabledUpdate = true;
        setTimeout(() => this.isDisabledUpdate = false, 5000)
      },
      changeRates(val) {
        this.exchangeRatesSelected = val
      },
      updateOriginalCurrency(val) {
        this.originalCurrency = val
      },
      updateDesiredCurrency(val) {
        this.desiredCurrency = val
      },
      async getCourseCurrency() {
        let response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${await this.getCurrencySymbols()}&api_key=15425149e0ad5b140f8585485fa8ab678679c32e8645644e15eb47ac8ef564fd`)
        this.currenciesValues = response.data
      },
      async getAvailableCurrencies() {
        const response = await axios.get('https://63f683ef9daf59d1ad8a4e37.mockapi.io/currencyList')
        return this.availableCurrencies = response.data
      },
      async getCurrencySymbols() {
        try {
          const currencies = await axios.get('https://63f683ef9daf59d1ad8a4e37.mockapi.io/currencyList');
          let arr = currencies.data
          let symbols
          return symbols = Object.values(arr).map(item => item.symbol).join()
        } catch (e) {
          console.log(e)
        }
      },
      async postCurrency(value) {
        try {
          await axios.post('https://63f683ef9daf59d1ad8a4e37.mockapi.io/currencyList', {
            symbol: value
          })
          this.isHiddenMenu = true
        } catch (e) {
          console.log(e)
        }
      },
      hideMenu(event) {
        if (!event.target.closest('.all-exchange-rates__adding') && !this.isHiddenMenu) {
          this.isHiddenMenu = true
        }
      },
    },
    computed: {
    },
    watch: {
    },
    mounted() {
      this.getAvailableCurrencies()
      this.getCourseCurrency()
    }
  }
</script>

<style lang="scss">
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  min-height: 100vh;
  background: #CAD2C5;
  display: flex;
  flex-direction: column;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  color: #354f52;
}
</style>
