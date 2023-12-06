<template>
  <section class="section-wrapper">
    <div class="sales-widget__header">
      <h2>Лента акций</h2>
      <div class="sales-widget__arrow" @click="listToggle">
        <iconArrow />
      </div>
    </div>

    <div v-if="!loading" :class="`sales-list`">
      <SaleCard v-for="sale in sales" :sale="sale" :config="config" />
    </div>
    <Throbber :view="view" v-if="loading" />
  </section>
</template>

<script>
import SaleCard from '@/components/Sales/Card.vue'
import Throbber from '@/components/Sales/Throbber.vue'
import iconArrow from '@/components/icons/iconArrow.vue'
export default {
  components: {
    SaleCard,
    Throbber,
    iconArrow
  },

  computed: {
    sales() {
      return this.$store.getters.getSales
    },
    loading() {
      return this.$store.getters.getLoading
    },
    config() {
      return this.$store.getters.getConfig
    }
  },

  methods: {
    listToggle() {
      this.$store.dispatch('listToggle')
    }
  }
}
</script>
