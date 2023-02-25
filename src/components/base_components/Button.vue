<template>
  <section :class="disableButton">
    <button :disabled="isDisabledUpdate" >
      <slot></slot>
    </button>
  </section>
</template>

<script>
export default {
  name: 'Button',
  props: {
    isDisabledUpdate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableButton() {
      return {
        'all-exchange-rates__adding-button__disabled': this.isDisabledUpdate,
        'all-exchange-rates__adding-button': !this.isDisabledUpdate
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.all-exchange-rates {
  &__adding-button,
  &__adding-button__disabled {
    padding: 2px;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: inset 0 0 4px #52796f;
    align-items: center;
    border: 1px solid #354f52;
    & button {
      padding: 10px 0;
      width: 100%;
      border: none;
      color: #354f52;
      background: transparent;
      font-style: italic;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      font-size: 18px;
      text-shadow: 0 0 1px #354f52;
    }
  }
  &__adding-button {
    &:hover {
      border: 1px solid #CAD2C5;
      background: #354f52;
      & button {
        color: #CAD2C5;
        text-shadow: none;
      }
    }
  }
  &__adding-button__disabled {
    background: #84a98c;
    position: relative;
    &:before{
      content: 'Wait for new update';
      display: inline-block;
      position: absolute;
      padding: 13px;
      backdrop-filter: blur(15px);
      text-align: center;
      font-weight: 700;
      letter-spacing: 1px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>