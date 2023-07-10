<template>
    <Title title="Профиль" />
    <div class="page-wrapper">
      <div class="profile" v-if="authUser">
        <div class="profile__image">
            <img :src="authUser.avatar" alt="">
        </div>
        <input type="file" @change="uploadAvatar">
        <div class="profile__info">
            <div class="profile__name">{{ authUser.name }}</div>
            <div class="profile__email">{{ authUser.email }}</div>
        </div>
      </div>
    </div>
</template>

<script>
    import Title from '@/components/UI/Title.vue'
    export default {
        components: {
            Title
        },
        computed: {
            authUser (){
                return this.$store.getters.getAuthUser
            },
        },
        methods: {
            uploadAvatar (){
                const file = event.target.files[0]
                this.$store.dispatch('uploadFile', {id: this.authUser.id,file})
                this.$store.dispatch('setAvatar', this.authUser.id)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>