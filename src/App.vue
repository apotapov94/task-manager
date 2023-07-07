<template>
  <div class="content-wrapper" @click="hidePopups">
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
  },
  methods: {
    hidePopups(){
      if(!event.target.classList.contains('context-block') && !event.target.classList.contains('context-block-link')){
        this.$store.dispatch('closeContextBlock', 'all')
      } else {
        return false
      }
    }
  }
}
</script>
