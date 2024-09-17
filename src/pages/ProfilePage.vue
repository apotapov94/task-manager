<template>
    <Title title="Профиль" />
    <div class="page-wrapper">
      <div class="profile" v-if="authUser">
        <div class="profile__image">
            <label for="changeAvatar">
                <img v-if="authUser.avatar" :src="authUser.avatar" alt="">
                <IconUser class="user-icon" v-else />
                <IconPlus />
            </label>
            <input id="changeAvatar" type="file" @change="uploadAvatar">
        </div>
        
        <div class="profile__info">
        </div>
        <EditProfileForm :user="authUser" />
      </div>
      
    </div>
</template>

<script>
    import Title from '@/components/UI/Title.vue'
    import EditProfileForm from '@/components/EditProfileForm.vue'
    import IconPlus from '@/components/icons/iconPlus.vue'
    import IconUser from '@/components/icons/iconUser.vue'
    export default {
        components: {
            Title, EditProfileForm, IconPlus, IconUser
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
        },
        mounted (){
            this.$store.dispatch('hidePanel')
            this.$store.dispatch('closeMenu')
        },
    }
</script>

<style lang="scss" scoped>

</style>