<template>
  <main class="all-exchange-rates">
    <section class="all-exchange-rates__content">
      <H2 style="flex: none">
        Exchange Rates
      </H2>
      <section class="all-exchange-rates__buttons">
        <section class="all-exchange-rates__adding">
          <Button @click="$emit('changeIsHiddenMenu')">Click here to add new currency</Button>
          <section
              :class="showAddingMenu"
          >
            <form class="menu-form" @submit.prevent>
              <section class="menu-form__input">
                <Input
                    type="text"
                    v-model="searchCurrency"
                    placeholder="Search currency..."
                />
              </section>
              <Button style="flex: 1 1 30%" @click="addCurrency">Add</Button>
              <aside :class="isHint">{{ hint }}</aside>
            </form>
            <section class="menu-list">
              <article
                  @click="addCurrency"
                  v-for="cur of searchedCurrencyList"
                  class="menu-list__item"
              >
                {{ cur }}
              </article>
            </section>
          </section>
        </section>
        <Button :isDisabledUpdate="isDisabledUpdate" @click="updateRate">Update the exchange rate</Button>
      </section>
      <ExchangeRatesList
          :exchangeRatesSelected="exchangeRatesSelected"
          :availableCurrencies="availableCurrencies"
          :exchangeRatesList="exchangeRatesList"
          @changeRates="changeRates"
      />
    </section>
  </main>

</template>

<script>
import Button from "@/components/base_components/Button.vue";
import Input from "@/components/base_components/Input.vue";
import H2 from "@/components/base_components/H2.vue";
import ExchangeRatesList from "@/components/ExchangeRatesList.vue";
import axios from "axios";

export default {
  components: {
    ExchangeRatesList, Button, Input, H2
  },
  name: "TheExchangeRates",
  props: {
    availableCurrencies: Array,
    isDisabledUpdate: Boolean,
    exchangeRatesSelected: String,
    isHiddenMenu: Boolean,
    getCurrencySymbols: Function
  },
  data() {
    return {
      exchangeRatesList: [],
      searchCurrency: '',
      coinCurrencyList: [],
      hint: '',
    }
  },
  methods: {
    async updateRate() {
      this.$emit('updateRate')
      await this.getCurrencySymbols()
      await this.getAllExchangeRates()
    },
    changeRates(val){
      this.$emit('changeRates', val)
    },
    async getAllExchangeRates() {
      let response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${this.exchangeRatesSelected}&tsyms=${await this.getCurrencySymbols()}&api_key=15425149e0ad5b140f8585485fa8ab678679c32e8645644e15eb47ac8ef564fd`)
      return this.exchangeRatesList = response.data
    },
    async addCurrency(event) {
      const newCurrency = {
        id: Date.now()
      }
      if (event.target.tagName === "BUTTON") {
        const isCurrency = Object.values(this.coinCurrencyList).find(currency => currency.toLowerCase() === this.searchCurrency);
        if (isCurrency) {
          newCurrency.symbol = isCurrency
        } else {
          this.hint = 'Not available currency'
          setTimeout(() => this.hint = '', 2000)
          return
        }
      } else {
        newCurrency.symbol = event.target.innerHTML
      }
      const isAlreadyOne = this.availableCurrencies.find(item => item.symbol === newCurrency.symbol)
      if (isAlreadyOne) {
        this.hint = 'There is already one'
        setTimeout(() => this.hint = '', 2000)
      } else {
        this.$emit('postCurrency', newCurrency.symbol)
        await this.getCurrencySymbols()
        await this.getAllExchangeRates()
        this.availableCurrencies.push(newCurrency)
        this.searchCurrency = ''
      }
    },
    async getCurrenciesList() {
      const coinListResponse = await axios.get('https://min-api.cryptocompare.com/data/blockchain/list?api_key=15425149e0ad5b140f8585485fa8ab678679c32e8645644e15eb47ac8ef564fd');
      const currencyListResponse = await axios.get('https://openexchangerates.org/api/currencies.json?api_key=29f2ee44730349398abe2f6741fc44c6');
      const coinArr = Object.keys(coinListResponse.data.Data);
      const currencyArr = Object.keys(currencyListResponse.data);
      return this.coinCurrencyList = [...new Set(coinArr.concat(currencyArr))];
    },
  },
  computed: {
    searchedCurrencyList() {
      if (this.searchCurrency) {
        return Object.values(this.coinCurrencyList).filter(currency => currency.toLowerCase().includes(this.searchCurrency.toLowerCase()))
      }
    },
    showAddingMenu() {
      return {
        'all-exchange-rates__adding-menu__hidden': this.isHiddenMenu,
        'all-exchange-rates__adding-menu': !this.isHiddenMenu,
      }
    },
    isHint() {
      return {
        'show-hint': this.hint,
        'close-hint': !this.hint
      }
    }
  },
  watch: {
    exchangeRatesSelected(){
      this.getAllExchangeRates()
    }
  },
  mounted() {
    this.getAllExchangeRates()
    this.getCurrenciesList()
  }
}
</script>

<style lang="scss" scoped>
.all-exchange-rates {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  &__content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
    padding: 5px 10px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }
  &__header{
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    padding: 5px 0;
  }
  &__adding {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
  }
  &__adding-menu {
    top: 50px;
    left: 0;
    right: 0;
    position: absolute;
    background: #CAD2C5;
    animation: show-menu 0.2s linear;
    transform-origin: top;
    padding: 5px;
    border: 1px solid #354f52;
    &__hidden {
      display: none;
    }
  }
}
.menu-form {
  display: flex;
  justify-content: space-between;
  position: relative;
  &__input{
    flex: 0 1 70%;
    & input {
      width: 100%;
    }
  }
}
.menu-list {
  max-height: 35vh;
  overflow: auto;
  &__item {
    padding: 15px 10px;
    border: 1px solid #354f52;
    margin: 8px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      background: linear-gradient(270deg, #84a98c 0%, #CAD2C5 100%);
    }
  }
}
.show-hint {
  position: absolute;
  color: #CAD2C5;
  background: #354f52;
  bottom: 100%;
  padding: 5px;
}
.close-hint {
  display: none;
}
@keyframes show-menu {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
@media (min-width: 600px) {
  .all-exchange-rates {
    &__buttons {
      flex-direction: row-reverse;
      gap: 15px;
    }
  }
  .menu-list {
    max-height: 45vh;
  }
}

</style>