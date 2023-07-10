<template>
    <div :class="`loader ${size}`">
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss">
    .small {
        width: 24px;
        height: 24px;
        animation-duration: .5s;
        &::before {
            display: none;
        }
        &::after {
            display: none;
        }
    }    
</style>