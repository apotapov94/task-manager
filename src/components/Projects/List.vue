<template>
    <div :class="`tasks-list projects-list ${viewMode}`">
        <Project v-for="project in projects" :project="project" />
    </div>
    <AppButton @click="showAddProjectForm">Добавить проект</AppButton>
</template>

<script>
    import Project from '@/components/Projects/Card.vue'

    export default {
        components: {
            Project
        },
        props: {
            projects: {
                type: Array,
                default: []
            }
        },
        computed: {
            viewMode (){
                return this.$store.getters.getViewMode
            }
        },    
        methods: {
            showAddProjectForm() {
                this.$store.dispatch('showPanel');
                this.$store.dispatch('showView', 'addProject');
                this.$store.dispatch('setHeading', 'Новый проект');
            }
        }
    }
</script>
