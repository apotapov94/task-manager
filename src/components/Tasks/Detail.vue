<template>
    <div class="task-detail" v-if="task">
        <div class="task-detail__header">
            <div class="task-detail__buttons" v-if="authUser.id == task.author || authUser.id == task.executor">
                <AppButton>Готово</AppButton>
            </div>
            <div class="task-detail__created-at">
                Создано: <span>{{ task.created }}</span>
            </div>
        </div>
        <div class="task-detail__body">
            <div class="task-detail__info user">
                Исполнитель: <span>{{ getUser(task.executor).name }}</span>
            </div>
            <div class="task-detail__info user">
                Постановщик: <span>{{ getUser(task.author).name }}</span>
            </div>
            <div class="task-detail__info">
                Дедлайн: <span>{{ dateFormat(task.date) }}</span> <div v-if="daysAfterDeadline(task.date) > 0" class="task-detail__deadline-days-count">{{ daysAfterDeadline(task.date) }}</div>
            </div>
            <div :class="`task-detail__info task-detail__priority ${task.priority}`">
                Приоритет: <span>{{ getPriority(task.priority) }}</span>
            </div>
            <div class="task-detail__description">
                {{ task.descr }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            task (){
                return this.$store.getters.getTaskById
            },
            authUser (){
                return this.$store.getters.getAuthUser
            }
        },
        methods: {
            daysAfterDeadline (date){
                let currentDate = Date.parse(new Date())
                let days = (currentDate - Date.parse(date))/86400000
                return Math.round(days)
            },
            dateFormat (date){
                let formatedDate = date.slice(0, 10)
                formatedDate = formatedDate.split('-')
                const year = formatedDate[0]
                const month = formatedDate[1]
                const day = formatedDate[2]
                formatedDate = `${day}.${month}.${year}`
                return formatedDate
            },
            getUser (id){
                return this.$store.getters.getUserById(id)
            },
            getPriority (priority){
                let priorityText
                switch(priority){
                    case 'standart':
                        priorityText = 'Стандартный'
                        break
                    case 'high':
                        priorityText = 'Повышенный'
                        break    
                    case 'very-high':
                        priorityText = 'Высокий'
                        break 
                }
                return priorityText
            }
        }
    }
</script>

<style lang="scss">

</style>