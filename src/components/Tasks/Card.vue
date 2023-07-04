<template>
  <div @click="showTaskDetail" :class="`task-card ${task.priority}`">
    <div class="task-card__header">
      <div class="task-card__title">{{ task.title }}</div>
    </div>
    <div class="task-card__body">
      {{ task.descr }}
    </div>
    <div class="task-card__footer">
      <div class="task-card__date">
        {{ dateFormat(task.date) }}
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
      this.$store.dispatch('setTaskToShow', this.task.id)
      this.$store.dispatch('showView', 'task-detail');
      this.$store.dispatch('setHeading', this.task.title);
    }
  }
}
</script>
