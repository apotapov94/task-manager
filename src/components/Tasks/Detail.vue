<template>
    <div class="task-detail" v-if="task">
        <div class="task-detail__header">
            <div v-if="mode === 'edit'">Режим редактирования:</div>
            <div class="task-detail__buttons" v-if="authUser.id === task.executor && mode !== 'edit'">
                <AppButton @click="setStatus('done')" v-if="task.status === 'active' && authUser.id == task.author">Готово</AppButton>
                <AppButton @click="setStatus('checking')" v-if="task.status === 'active' && authUser.id !== task.author">Готово</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'checking'">На проверке</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'done'">Выполнено</AppButton>
                <div class="small-icons" v-if="authUser.id == task.author">
                    <div class="small-icon edit">
                        <EditIcon @hover="openContextBlock('edit')" @click="setMode('edit')" />
                        <div class="tooltip">Редактировать</div>
                    </div>
                    <div class="small-icon remove" @click="deleteTask(curTaskId)">
                        <img src="@/assets/img/remove.png" alt="">
                        <div class="tooltip">Удалить</div>
                    </div>
                </div>
            </div>
            <div class="task-detail__buttons" v-else-if="authUser.id === task.author && mode !== 'edit'">
                <AppButton @click="setStatus('active')" v-if="task.status === 'checking'">Вернуть в работу</AppButton>
                <AppButton @click="setStatus('done')" v-if="task.status === 'checking'">Готово</AppButton>
                <AppButton class="btn-default" v-if="task.status === 'done'">Выполнено</AppButton>
                <div class="small-icons">
                    <div class="small-icon edit">
                        <EditIcon @hover="openContextBlock('edit')" @click="setMode('edit')" />
                        <div class="tooltip">Редактировать</div>
                    </div>
                    <div class="small-icon remove" @click="deleteTask(curTaskId)">
                        <img src="@/assets/img/remove.png" alt="">
                        <div class="tooltip">Удалить</div>
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
                Исполнитель: 
                <span v-if="mode === 'edit'" class="context-block-link" @click="openContextBlock('users')">{{ getUser(editedFields.executor).name }}</span>
                <span v-if="mode !== 'edit'">{{ getUser(task.executor).name }}</span>
                <div class="context-block" v-if="contextBlocks.users">
                    <div v-for="user in users" class="filter__item" :class="{selected: editedFields.executor === user.id}" @click="writeField({field: 'executor', value: user.id})">
                        {{user.name}}
                    </div>
                </div>
            </div>
            <div class="task-detail__info user" v-if="mode !== 'edit'">
                Постановщик: <span>{{ getUser(task.author).name }}</span>
            </div>
            <div class="task-detail__info user" v-if="task.project || mode === 'edit'">
                Проект: 
                <span  v-if="mode === 'edit'" @click="openContextBlock('projects')">
                    <span class="context-block-link" v-if="editedFields.project !== ''">{{ getProject(editedFields.project).title }}</span>
                    <span class="context-block-link" v-else>Без проекта</span>
                </span>
                <span v-if="mode !== 'edit'">
                    <router-link 
                        class="link" 
                        :to="`/projects/${getProject(task.project).keyword}`"
                        @click="openContextBlock('projects')">
                        {{ getProject(task.project).title }}
                    </router-link>
                </span>
                <div class="context-block" v-if="contextBlocks.projects">
                    <div v-for="project in projects" :class="{selected: editedFields.project === project.id}" class="filter__item" @click="writeField({field: 'project', value: project.id})">
                        {{project.title}}
                    </div>
                </div>
            </div>
            <div class="task-detail__info">
                Дедлайн: 
                <span v-if="mode !== 'edit'">{{ task.date }}</span> 
                <span class="context-block-link" v-if="mode === 'edit'" @click="openContextBlock('datePicker')">{{ editedFields.date }}</span> 
                <div v-if="daysAfterDeadline(task.date) > 0 && mode !== 'edit'" class="task-detail__deadline-days-count">{{ daysAfterDeadline(task.date) }}</div>
                <div v-if="contextBlocks.datePicker" class="context-block">
                    <VDatePicker v-model.string="date" :masks="{modelValue: 'DD.MM.YYYY'}" />
                    <div class="date-picker__btns">
                        <AppButton class="btn-warning">Отмена</AppButton>
                        <AppButton @click="calendarValueSave">Сохранить</AppButton>
                    </div>
                </div>
            </div>
            <div :class="`task-detail__info task-detail__priority`">
                Приоритет: 
                <span v-if="mode === 'edit'" :class="`context-block-link ${editedFields.priority}`" @click="openContextBlock('priority')">{{ getPriority(editedFields.priority) }}</span>
                <span v-if="mode !== 'edit'" :class="task.priority">{{ getPriority(task.priority) }}</span>
                <div class="context-block" v-if="contextBlocks.priority">
                    <div class="filter__item" :class="{selected: editedFields.priority === 'standart'}" @click="writeField({field: 'priority', value: 'standart'})">
                        Стандартный
                    </div>
                    <div class="filter__item" :class="{selected: editedFields.priority === 'high'}" @click="writeField({field: 'priority', value: 'high'})">
                        Повышенный
                    </div>
                    <div class="filter__item" :class="{selected: editedFields.priority === 'very-high'}" @click="writeField({field: 'priority', value: 'very-high'})">
                        Высокий
                    </div>
                </div>
            </div>
            <div class="task-detail__description">
                <div v-show="mode !== 'edit'">{{ task.descr }}</div>
                <textarea @input="writeField({field: 'descr', value: 'input'})" v-if="mode === 'edit'">{{ task.descr }}</textarea>
                <span class="edit-icon" v-if="mode === 'edit'"><EditIcon /></span>
            </div>
        </div>
        <div class="task-detail__footer">
            <div class="task-detail__edit-btns" v-if="mode === 'edit'">
                <AppButton class="btn-warning" @click="setMode('')">Отмена</AppButton>
                <AppButton @click="saveTask(task.id)">Сохранить</AppButton>
            </div>
            <Comments v-if="mode !== 'edit'" :comments="comments" />
        </div>
    </div>
</template>

<script>
    import Comments from '@/components/Comments/List.vue'
    import EditIcon from '@/components/icons/iconEdit.vue'
    export default {
        components: {
            Comments,
            EditIcon,
        },
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        computed: {
            date: {
                get() {
                    return this.$store.getters.getCalendarValue
                },
                set(value) {
                    this.$store.dispatch('updateDate', value)
                }
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
            },
            editedFields (){
                return this.$store.getters.getEditedFields
            },
            contextBlocks (){
                return this.$store.getters.getContextBlocks
            },
            users (){
                return this.$store.getters.getUsers
            },
            projects (){
                return this.$store.getters.getProjects
            },
        },
        methods: {
            calendarValueSave (){
                const value = this.$store.getters.getCalendarValue
                this.$store.dispatch('writeField', {field: 'date', value})
                this.$store.dispatch('closeContextBlock', 'datePicker')
            },
            writeField ({field, value}){
                if(value === 'input'){
                    value = event.target.value
                }
                this.$store.dispatch('writeField', {field, value})
            },
            openContextBlock (block){
                console.log(block)
                this.$store.dispatch('openContextBlock', block)
            },
            daysAfterDeadline (date){
                let currentDate = Date.parse(new Date())
                let formatedDate = date.split('.')
                const taskDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`

                let days = (currentDate - Date.parse(taskDate))/86400000
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
                    if(mode === 'edit'){
                        this.$store.dispatch('initialEdit', this.task)
                    }
                }
            },
            saveTask (id){
                this.$store.dispatch('saveTask', {fields: this.editedFields, id})
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