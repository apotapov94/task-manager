<template>
    <div class="project-card">
        <div class="project-card__top">
            <div class="project-card__image">
                {{ getBgSymbol(project.title) }}
            </div>
        </div>
        <router-link :to="{name: 'projectPage', params: { keyword: project.keyword }}" class="project-card__bottom">
            <span class="project-card__title">{{ project.title }}</span>
            <span class="project-card__date">{{ project.created }}</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            project: {
                type: Object,
                required: true
            }
        },
        methods: {
            getUser (id){
                return this.$store.getters.getUserById(id)
            },
            dateFormat (date){
                let formatedDate = date.slice(0, 10)
                return formatedDate
            },
            getBgSymbol (string){
                return string.slice(0, 1)
            }
        }
    }
</script>
