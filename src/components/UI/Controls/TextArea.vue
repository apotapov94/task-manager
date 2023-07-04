<template>
    <div class="input-group">
        <label><slot /></label>
        <textarea
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"    
        >
        </textarea>
        <p class="error-text" v-for="error of errors" :key="error.$uid">
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
            placeholder: {
                type: String,
                required: true
            },
            errors: {
                type: Array,
                default: []
            }
        }
    }
</script>