<template>
    <Title :title="project.title" />
    <div class="page-wrapper">
        <div class="project-page">
            <div class="project-page__top">
                <div class="project-page__image">
                    {{ getBgSymbol(project.title) }}
                </div>
                <div class="project-page__info">
                    <div class="project-page__date">Создан: <span>{{ dateFormat(project.created) }}</span></div>
                    <div class="project-page__status">Статус: <span>{{ getStatus(project.status) }}</span></div>
                </div>
            </div>
            <div class="project-page__bottom">
                <div class="project-page__descr">{{ project.descr }}</div>
            </div>
            <TasksList :tasks="tasks" view="list" />
        </div>
    </div>
</template>
  
<script>
  import Title from '@/components/UI/Title.vue'
  import ProjectsList from '@/components/Projects/List.vue'
  import ViewSwitcher from '@/components/UI/ViewSwitcher.vue'
  import TasksList from '@/components/Tasks/List.vue'

  export default {
    components: {
      Title, ProjectsList, ViewSwitcher, TasksList
    },
    computed: {
        project (){
            return this.$store.getters.getProjectByKeyword(this.$route.params.keyword)
        },
        tasks (){
            return this.$store.getters.getTasksByProjectId(this.project.id)
        }
    },
    methods: {
        getBgSymbol (string){
            return string.slice(0, 1)
        },
        dateFormat (date){
            let formatedDate = date.slice(0, 10)
            return formatedDate
        },
        getStatus (status){
            let statusText
            switch(status){
                case 'active':
                    statusText = 'Активен'
                    break
                case 'disable':
                    statusText = 'Не активен'
                    break    
            }
            return statusText
        },
    },
    mounted (){
            this.$store.dispatch('hidePanel')
            this.$store.dispatch('closeMenu')
        },
  }
</script>