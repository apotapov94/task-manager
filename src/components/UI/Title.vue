<template>
  <section class="title-section">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
