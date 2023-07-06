<template>
    <Title title="Проекты" />
    <div class="page-wrapper">
        <div class="top-panel">
            <ViewSwitcher />
        </div>
        <ProjectsList :projects="this.$store.getters.getProjects" />
    </div>
</template>
  
<script>
  import Title from '@/components/UI/Title.vue'
  import ProjectsList from '@/components/Projects/List.vue'
  import ViewSwitcher from '@/components/UI/ViewSwitcher.vue'
  export default {
    components: {
      Title, ProjectsList, ViewSwitcher
    },
  }
</script>