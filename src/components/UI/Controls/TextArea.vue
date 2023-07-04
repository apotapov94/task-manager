<template>
    <div class="input-group">
        <label><slot /></label>
        <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"    
        >
        </textarea>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: String,
                default: ''
            }
        }
    }
</script>