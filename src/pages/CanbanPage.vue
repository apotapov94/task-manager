<template>
    <Title title="Доска задач" />
    <div class="page-wrapper">
        <div class="top-panel">
            <Search />
            <Filter />
        </div>
        <TasksCanban />
    </div>
</template>

<script>
    import router from '../router'
    import TasksCanban from '@/components/Tasks/Canban.vue'
    import Title from '@/components/UI/Title.vue'
    import Search from '@/components/UI/Search.vue'
    import Filter from '@/components/UI/Filter.vue'
    export default {
        components: {
            TasksCanban, Title, Search, Filter
        },
        mounted (){
            this.$store.dispatch('hidePanel')
            this.$store.dispatch('closeMenu')
            this.$store.dispatch('resetAllFilters')
            this.$store.dispatch('resetSearch')
        },
    }
</script>

<style lang="scss" scoped>

</style>