<template>
    <div class="search">
        <AppInput v-model="search" placeholder="поиск" />
    </div>
</template>

<script>
    export default {
        computed: {
            search: {
                get() {
                    return this.$store.getters.getSearch
                },
                set(value) {
                    this.$store.dispatch('updateSearch', value)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>