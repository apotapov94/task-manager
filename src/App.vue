<template>
  <div
    :class="`content ${opened ? 'active' : ''}`"
    :style="opened ? `background-color: ${config.mainColor}` : ''"
  >
    <div class="container">
      <SalesList :styles="config" />
    </div>
  </div>
</template>

<script>
import SalesList from '@/components/Sales/List.vue'
export default {
  computed: {
    config() {
      return this.$store.getters.getConfig
    },
    opened() {
      return this.$store.getters.isOpen
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchConfig')
    this.$store.dispatch('fetchSales')
  },
  created() {},
  methods: {},
  components: { SalesList }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.content {
  height: 120px;
  overflow: hidden;
  transition: all 0.4s;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 8px 8px 23px #a1a1a1;
}
.content.active {
  height: 500px;
}
.sales-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.task-card {
  display: flex;
  justify-content: space-between;
}
.sales-widget__arrow {
  cursor: pointer;
  transition: all 0.4s;
}
.content.active .sales-widget__arrow {
  transform: rotate(180deg);
}

.sales-widget__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
