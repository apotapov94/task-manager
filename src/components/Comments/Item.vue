<template>
    <div class="comment">
        <div class="comment__left">
            <div class="comment__avatar">
                <img src="@/assets/img/user-profile.png" alt="">
            </div>
        </div>
        <div class="comment__right">
            <div class="comment__info">
                <div class="comment__author">{{ getUser(comment.author).name }}</div>
                <div class="comment__date">{{ dateFormat(comment.created) }}</div>
            </div>
            <div class="comment__text">
                {{ comment.text }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        methods: {
            getUser (id){
                return this.$store.getters.getUserById(id)
            },
            dateFormat (date){
                let formatedDate = date.slice(0, 17)
                return formatedDate
            },
        }
    }
</script>
