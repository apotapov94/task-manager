<template>
    <div class="view-switcher">
        <div @click="switchMode('grid')" class="view-mode grid" :class="{ active: viewMode == 'grid' }"><GridIcon /></div>
        <div @click="switchMode('list')" class="view-mode list" :class="{ active: viewMode == 'list' }"><ListIcon /></div>
    </div>
</template>

<script>
    import GridIcon from '@/components/icons/iconGrid.vue'
    import ListIcon from '@/components/icons/iconList.vue'
    export default {
        components: {
            GridIcon, ListIcon
        },
        computed: {
            viewMode (){
                return this.$store.getters.getViewMode
            }
        },
        methods: {
            switchMode (mode){
                this.$store.dispatch('switchMode', mode)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>