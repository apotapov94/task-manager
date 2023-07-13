<template>
    <div class="filter">
        <div class="added-filters" v-if="this.$store.getters.getFiltersCount > 0">
            <div class="filter__active-filter" v-if="filter.project.active && !projectFilterExclude">
                Проект: 
                <span @click="openContextBlock('projects')">
                    <span class="context-block-link active-value" v-if="filter.project.name">{{filter.project.name}}</span>
                    <span class="context-block-link" v-else>Выберите проект</span>
                </span>
                <span class="reset-filter" v-if="filter.project.name" @click="resetFilter('project')"><CloseIcon /></span>
                <div class="context-block" v-if="contextBlocks.projects">
                    <div v-for="project in projects" :class="{selected: filter.project.name === project.title}" class="filter__item" @click="setFilter({filter: 'project', value: project.id, name: project.title})">
                        {{project.title}}
                    </div>
                </div>
            </div>
            <div class="filter__active-filter" v-if="filter.executor.active && !executorFilterExclude">
                Исполнитель: 
                <span @click="openContextBlock('users')">
                    <span class="context-block-link active-value" v-if="filter.executor.name">{{filter.executor.name}}</span>
                    <span class="context-block-link" v-else>Выберите исполнителя</span>
                </span>
                <span class="reset-filter" v-if="filter.executor.name" @click="resetFilter('executor')"><CloseIcon /></span>
                <div class="context-block" v-if="contextBlocks.users">
                    <div v-for="user in users" class="filter__item" :class="{selected: filter.executor.name === user.name}" @click="setFilter({filter: 'executor', value: user.id, name: user.name})">
                        {{user.name}}
                    </div>
                </div>
            </div>
            <div class="filter__active-filter" v-if="filter.priority.active && !priorityFilterExclude">
                Приоритет: 
                <span @click="openContextBlock('priority')">
                    <span class="context-block-link active-value" v-if="filter.priority.name">{{filter.priority.name}}</span>
                    <span class="context-block-link" v-else>Выберите приоритет</span>
                </span>
                <span class="reset-filter" v-if="filter.priority.name" @click="resetFilter('priority')"><CloseIcon /></span>
                <div class="context-block" v-if="contextBlocks.priority">
                    <div class="filter__item" :class="{selected: filter.priority.value === 'standart'}" @click="setFilter({filter: 'priority', value: 'standart', name: 'Стандартный'})">
                        Стандартный
                    </div>
                    <div class="filter__item" :class="{selected: filter.priority.value === 'high'}" @click="setFilter({filter: 'priority', value: 'high', name: 'Повышенный'})">
                        Повышенный
                    </div>
                    <div class="filter__item" :class="{selected: filter.priority.value === 'very-high'}" @click="setFilter({filter: 'priority', value: 'very-high', name: 'Высокий'})">
                        Высокий
                    </div>
                </div>
            </div>
        </div>
        <div class="add-filter" v-if="this.$store.getters.getFiltersCount !== 3">
            <div class="add-filter__link context-block-link" @click="openContextBlock('filters')">Добавить фильтр</div>
            <div class="filters context-block" v-if="contextBlocks.filters">
                <div class="filter__item" v-if="!projectFilterExclude && !filter.project.active" @click="addFilter('project')">
                    Проект
                </div>
                <div class="filter__item" v-if="!executorFilterExclude && !filter.executor.active" @click="addFilter('executor')">
                    Исполнитель
                </div>
                <div class="filter__item" v-if="!priorityFilterExclude && !filter.priority.active" @click="addFilter('priority')">
                    Приоритет
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CloseIcon from '@/components/icons/iconClose.vue'
    export default {
        components: {
            CloseIcon
        },
        props: {
            projectFilterExclude: {
                type: Boolean,
                default: false
            },
            executorFilterExclude: {
                type: Boolean,
                default: false
            },
            priorityFilterExclude: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            filter (){
                return this.$store.getters.getFilter
            },
            contextBlocks (){
                return this.$store.getters.getContextBlocks
            },
            users (){
                return this.$store.getters.getUsers
            },
            projects (){
                return this.$store.getters.getProjects
            }
        },
        methods: {
            openContextBlock (block){
                this.$store.dispatch('openContextBlock', block)
            },
            addFilter (filter){
                this.$store.dispatch('addFilter', filter)
            },
            hideAddFilterPanel (){
                this.$store.dispatch('hideAddFilterPanel')
            },
            setFilter (data){
                this.$store.dispatch('setFilter', data)
            },
            resetFilter (filter){
                this.$store.dispatch('resetFilter', filter)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>