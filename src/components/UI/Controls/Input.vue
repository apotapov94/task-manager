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
        <p v-if="errors" class="error-text" v-for="error of errors" :key="error.$uid">
            {{ error.$message }}
         </p>
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
            },
            errors: {
                type: Array,
                required: false
            }
        }
    }
</script>