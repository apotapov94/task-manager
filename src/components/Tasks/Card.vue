<template>
  <div @click="showTaskDetail" :class="`task-card ${task.priority}`">
    <div class="task-card__header">
      <div class="task-card__title">{{ task.title }}</div>
      <div class="task-card__executor">
        Исполнитель: <span class="user-link" @click="showUserInfo">{{ getUser(task.executor).name }}</span>
        <img class="task-card__executor-avatar" @click="showUserInfo" v-if="getUser(task.executor).avatar" :src="getUser(task.executor).avatar" alt="">
        <img class="task-card__executor-avatar" @click="showUserInfo" src="@/assets/img/user-profile.png" v-else alt="">
      </div>
      <div class="task-card__project" v-if="getProject(task.project)">
        Проект: <span><router-link class="link" :to="`/projects/${getProject(task.project).keyword}`">{{ getProject(task.project).title }}</router-link></span>
      </div>
    </div>
    
    <div class="task-card__footer">
      <div class="task-card__date">
        {{ task.date }}
      </div>
      <div :class="`task-card__priority ${task.priority}`">
        Приоритет: <span>{{ getPriority(task.priority) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconCross from '@/components/icons/IconCross.vue'
export default {
  components: {
    IconCross
  },
  props: {
    task: {
      type: Object,
      ruquired: true
    }
  },
  methods: {
    deleteTask(id) {
      console.log(id)
      this.$store.dispatch('deleteTask', id)
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
    showTaskDetail() {
      if(!event.target.classList.contains('user-link')){
        this.$store.dispatch('showPanel');
        this.$store.dispatch('setTaskToShow', this.task.id)
        this.$store.dispatch('showView', 'task-detail');
        this.$store.dispatch('setHeading', this.task.title);
      }
    },
    showUserInfo() {
      this.$store.dispatch('showPanel');
      this.$store.dispatch('setUserToShow', this.task.executor)
      this.$store.dispatch('showView', 'user-info');
      this.$store.dispatch('setHeading', 'Информация о пользователе');
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
    getProject (id){
      return this.$store.getters.getProjectById(id)
    },
    getUser (id){
      return this.$store.getters.getUserById(id)
    },
  }
}
</script>
