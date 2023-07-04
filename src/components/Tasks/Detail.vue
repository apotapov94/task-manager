<template>
    <div class="task-detail" v-if="task">
        <div class="task-detail__header">
            <div class="task-detail__buttons" >
                <AppButton v-if="authUser.id == task.author || authUser.id == task.executor">Готово</AppButton>
                <div class="small-icons">
                    <div class="small-icon remove" @click="deleteTask(curTaskId)" v-if="authUser.id == task.author">
                        <img src="@/assets/img/remove.png" alt="">
                    </div>
                </div>
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
            <div @click="setMode('edit-descr')" class="task-detail__description">
                <div v-show="mode !== 'edit-descr'">{{ task.descr }}</div>
                <textarea @keyup.enter="saveDescr(curTaskId)" v-show="mode === 'edit-descr'">{{ task.descr }}</textarea>
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
            },
            curTaskId (){
                return this.$store.getters.getActiveTaskId
            },
            mode (){
                return this.$store.getters.getMode
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
            },
            deleteTask (id){
                this.$store.dispatch('deleteTask', id)
            },
            setMode (mode){
                this.$store.dispatch('setMode', mode)
                let input = event.target.nextSibling;
                setTimeout(function(){
                    input.focus();
                }, 10)
            },
            saveDescr (id){
                let value = event.target.value
                this.$store.dispatch('saveDescr', { id, value })
            }
        }
    }
</script>

<style lang="scss">

</style>