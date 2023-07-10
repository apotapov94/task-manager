<template>
  <section class="title-section">
    <div class="title">
      <h1>{{ title }}</h1>
      <Loader size="small" v-if="loading" />
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    loading (){
      return this.$store.getters.getLoading
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
