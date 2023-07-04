<template>
    <div class="message" :class="type">
        {{ text }}
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'success'
            },
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">

</style>