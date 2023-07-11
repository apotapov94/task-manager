<template>
    <div class="user-info">
        <div class="task-detail__body">
            <div class="profile__image">
                <img v-if="user.avatar" :src="user.avatar" :alt="user.name">
                <IconUser class="user-icon" v-else />
            </div>
            <div class="task-detail__info">
                Имя: <span>{{ user.name }} {{ user.surname }}</span>
            </div>
            <div class="task-detail__info">
                Должность: <span>{{ user.position }}</span>
            </div>
            <div class="task-detail__info">
                Телефон: <span>{{ user.phone }}</span>
            </div>
            <div class="task-detail__info">
                Email: <span>{{ user.email }}</span>
            </div>
            <div class="task-detail__info">
                О себе:
                <span>{{ user.bio }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/iconUser.vue'
    export default {
        components: {
            IconUser
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>