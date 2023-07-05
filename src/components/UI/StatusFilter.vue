<template>
    <div class="status-filter">
        <span @click="setStatusFilter('all')" :class="{ active: filter.status == 'all' }">Все</span>
        <span @click="setStatusFilter('active')" :class="{ active: filter.status == 'active' }">В работе</span>
        <span @click="setStatusFilter('checking')" :class="{ active: filter.status == 'checking' }">На проверке</span>
        <span @click="setStatusFilter('done')" :class="{ active: filter.status == 'done' }">Закрытые</span>
    </div>
</template>

<script>
    export default {
        methods: {
            setStatusFilter (status){
                this.$store.dispatch('setStatusFilter', status)
            }
        },
        computed: {
            filter (){
                return this.$store.getters.getFilter
            }
        }
    }
</script>
