
<template>
    <div :class="`tasks-list throbber ${viewMode}`">
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
        <div class="task-card"></div>
    </div>
</template>

<script>
    export default {
        props: {
            view: {
                type: String,
                default: ''
            }
        },
        computed: {
            viewMode (){
                if(this.view){
                    return this.view
                } else {
                    return this.$store.getters.getViewMode
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>