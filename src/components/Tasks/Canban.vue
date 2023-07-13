<template>
    <section class="section-wrapper">
        <AppButton class="add-task-btn" @click="showAddTaskForm">Добавить задачу</AppButton>
        <div class="canban">
            <div class="canban__column column-todo" 
                @drop="onDrop($event, 'todo')"
                @dragover.prevent
                @dragenter="onDragenter($event, 'todo')">
                
                <div class="canban__column-title">Ожидает выполнения <span v-if="tasksTodo.length" class="tasks-count">{{ tasksTodo.length }}</span></div>
                <div class="canban__tasks-list" v-if="tasksTodo">
                    <div class="loader-wrap" v-if="loading">
                        <Loader />
                    </div>
                    <TaskCard 
                        class="dragable"  
                        draggable="true"
                        v-for="task in tasksTodo" 
                        :task="task" 
                        @dragstart="onDragstart($event, task.id)" />
                </div>
            </div>
            <div class="canban__column column-in-progress"
                @drop="onDrop($event, 'in-progress')"
                @dragover.prevent
                @dragenter="onDragenter($event, 'in-progress')">
                <div class="canban__column-title">В работе <span v-if="tasksInProgress.length" class="tasks-count">{{ tasksInProgress.length }}</span></div>
                <div class="canban__tasks-list dropable" v-if="tasksInProgress">
                    <div class="loader-wrap" v-if="loading">
                        <Loader />
                    </div>
                    <TaskCard 
                        class="dragable"  
                        draggable="true"
                        v-for="task in tasksInProgress" 
                        :task="task"
                        @dragstart="onDragstart($event, task.id)" />
                </div>
            </div>
            <div class="canban__column column-checking"
                @drop="onDrop($event, 'checking')"
                @dragover.prevent
                @dragenter="onDragenter($event, 'checking')">
                <div class="canban__column-title">На проверке <span v-if="tasksChecking.length" class="tasks-count">{{ tasksChecking.length }}</span></div>
                <div class="canban__tasks-list" v-if="tasksChecking">
                    <div class="loader-wrap" v-if="loading">
                        <Loader />
                    </div>
                    <TaskCard 
                        class="dragable"  
                        draggable="true"
                        v-for="task in tasksChecking" 
                        :task="task"
                        @dragstart="onDragstart($event, task.id)" />
                </div>
            </div>
            <div class="canban__column column-done"
                @drop="onDrop($event, 'done')"
                @dragover.prevent
                @dragenter="onDragenter($event, 'done')">
                <div class="canban__column-title">Готово <span v-if="tasksDone.length" class="tasks-count">{{ tasksDone.length }}</span></div>
                <div  class="canban__tasks-list" v-if="tasksDone">
                    <div class="loader-wrap" v-if="loading">
                        <Loader />
                    </div>
                    <TaskCard 
                        class="dragable"  
                        draggable="true"
                        v-for="task in tasksDone" 
                        :task="task"
                        @dragstart="onDragstart($event, task.id)" />
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
    import TaskCard from '@/components/Tasks/Card.vue'
    export default {
        components: {
            TaskCard
        },
        computed: {
            tasksTodo (){
                return this.$store.getters.getTasksTodo
            },
            tasksInProgress (){
                return this.$store.getters.getTasksInProgress
            },
            tasksChecking (){
                return this.$store.getters.getTasksChecking
            },
            tasksDone (){
                return this.$store.getters.getTasksDone
            },
            tasks (){
                return this.$store.getters.getAllTasks
            },
            loading (){
                return this.$store.getters.getLoading
            }
        },
        methods: {
            onDragstart (e, item){
                
                console.log(e.target)
                e.target.classList.add('drag')
                e.dataTransfer.dropEffect = 'move'
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('itemId', item)
            },
            onDrop (e, columnId){
                const itemId = e.dataTransfer.getData('itemId')
                console.log(columnId, itemId)
                this.$store.dispatch('setStatus', {id: itemId,status: columnId})
            },
            onDragenter (e, columnId){
                console.log(columnId)
            },
            showAddTaskForm() {
                this.$store.dispatch('showPanel');
                this.$store.dispatch('showView', 'addTask');
                this.$store.dispatch('setHeading', 'Новая задача');
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>