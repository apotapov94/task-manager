<template>
    <div class="task-detail" v-if="task">
        <div class="task-detail__header">
            <div class="task-detail__buttons" v-if="authUser.id == task.executor">
                <AppButton @click="setStatus('done')" v-if="task.status === 'active' && authUser.id == task.author">Готово</AppButton>
                <AppButton @click="setStatus('checking')" v-if="task.status === 'active' && authUser.id !== task.author">Готово</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'checking'">На проверке</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'done'">Выполнено</AppButton>
            </div>
            <div class="task-detail__buttons" v-else-if="authUser.id == task.author">
                <AppButton @click="setStatus('active')" v-if="task.status === 'checking'">Вернуть в работу</AppButton>
                <AppButton @click="setStatus('done')" v-if="task.status === 'checking'">Готово</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'done'">Выполнено</AppButton>
                <div class="small-icons">
                    <div class="small-icon remove" @click="deleteTask(curTaskId)">
                        <img src="@/assets/img/remove.png" alt="">
                    </div>
                </div>
            </div>
            <div class="task-detail__created-at">
                Создано: <span>{{ task.created }}</span>
            </div>
        </div>
        <div class="task-detail__body">
            <div class="task-detail__info status">
                Статус: <span :class="task.status">{{ getStatus(task.status) }}</span>
            </div>
            <div class="task-detail__info user">
                Исполнитель: <span>{{ getUser(task.executor).name }}</span>
            </div>
            <div class="task-detail__info user">
                Постановщик: <span>{{ getUser(task.author).name }}</span>
            </div>
            <div class="task-detail__info user">
                Проект: <span><router-link class="link" :to="`/projects/${getProject(task.project).keyword}`">{{ getProject(task.project).title }}</router-link></span>
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
        <div class="task-detail__footer">
            <Comments :comments="comments" />
        </div>
    </div>
</template>

<script>
    import Comments from '@/components/Comments/List.vue'
    export default {
        components: {
            Comments
        },
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
            },
            comments (){
                return this.$store.getters.getTaskComments
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
            getStatus (status){
                let statusText
                switch(status){
                    case 'active':
                        statusText = 'В работе'
                        break
                    case 'checking':
                        statusText = 'На проверке'
                        break    
                    case 'done':
                        statusText = 'Выполнена'
                        break 
                }
                return statusText
            },
            deleteTask (id){
                this.$store.dispatch('deleteTask', id)
            },
            setMode (mode){
                if(this.authUser.id == this.task.author){
                    this.$store.dispatch('setMode', mode)
                    let input = event.target.nextSibling;
                    setTimeout(function(){
                        input.focus();
                    }, 10)
                }
            },
            saveDescr (id){
                let value = event.target.value
                this.$store.dispatch('saveDescr', { id, value })
            },
            setStatus (status){
                let id = this.curTaskId
                this.$store.dispatch('setStatus', {id, status})
            },
            getProject (id){
                return this.$store.getters.getProjectById(id)
            },
        },
        beforeMount() {
            console.log(1)
            this.$store.dispatch('refreshComments');
        }
    }
</script>

<style lang="scss">

</style>