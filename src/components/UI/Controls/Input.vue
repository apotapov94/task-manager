<template>
    <div class="input-group">
        <label><slot /></label>
        <input
            v-bind="$attrs"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"    
        >
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                required: true
            }
        }
    }
</script>