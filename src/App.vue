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
  beforeCreate (){
    this.$store.dispatch('refreshUsers');
  },
  created (){
    this.$store.dispatch('refreshTasks');
    this.$store.dispatch('refreshProjects');
  },
  methods: {
    hidePopups(){
      if(!event.target.classList.contains('context-block') && !event.target.classList.contains('context-block-link') && !event.currentTarget.classList.contains('vc-container')){
        this.$store.dispatch('closeContextBlock', 'all')
      } else {
        return false
      }
    }
  }
}
</script>
