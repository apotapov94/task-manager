<template>
    <div class="comments-block">
        <div class="comments">
            <Comment v-for="comment in comments" :comment="comment" />
        </div>
        <form class="comments-form" @submit.prevent="addComment(curTaskId)">
            <AppTextArea placeholder="Комментарий" v-model="comment"></AppTextArea>
            <AppButton>Добавить комментарий</AppButton>
        </form>
    </div>
</template>

<script>
    import Comment from '@/components/Comments/Item.vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required, helpers } from '@vuelidate/validators'
    export default {
        components: {
            Comment
        },
        setup () {
            return { v$: useVuelidate() }
        },
        validations () {
            return {
                comment: { 
                    required: helpers.withMessage('Комментарий не может быть пустым', required)
                },
            }
        },
        props: {
            comments: {
                type: Array,
                default: []
            }
        },
        computed: {
            comment: {
                get() {
                    return this.$store.getters.getComment
                },
                set(value) {
                    this.$store.dispatch('updateComment', value)
                }
            },
            curTaskId (){
                return this.$store.getters.getActiveTaskId
            },
        },    
        methods: {
            addComment (id){
                this.$store.dispatch('addComment', id)
                this.$store.dispatch('commentFormReset')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>