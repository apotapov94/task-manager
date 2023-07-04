<template>
    <button
        class="btn"    
        :class="btnClass"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>

<script>
    export default {
        props: {
            btnClass: {
                type: String,
                default: 'btn-primary'
            }
        }
    }
</script>