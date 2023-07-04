<template>
  <div class="content-wrapper">
    <Header />
    <main>
      <RouterView />
    </main>
    <RightPanel />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import RightPanel from '@/components/RightPanel.vue'
export default {
  components: {
    Header,
    RightPanel
  },
  beforeMount (){
    this.$store.dispatch('refreshUsers');
  }
}
</script>
