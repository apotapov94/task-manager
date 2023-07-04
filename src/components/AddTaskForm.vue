<template>
  <div class="add-task-form">
    <form @submit.prevent="addTask">
      <AppInput placeholder="Название" v-model="newTask.title"></AppInput>
      <select name="priority" v-model="newTask.priority">
        <option value="standart">Стандартный</option>
        <option value="high">Повышенный</option>
        <option value="very-high">Высокий</option>
      </select>
      <select name="executor" v-model="newTask.executor">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
      <AppInput type="date" v-model="newTask.date" placeholder="Дата"></AppInput>
      <AppTextArea placeholder="Описание" v-model="newTask.descr"></AppTextArea>
      <AppButton>Вход</AppButton>
    </form>
  </div>
</template>

<script>
export default {
  
  computed: {
    newTask: {
      get() {
        return this.$store.getters.getNewTask
      },
      set(value) {
        this.$store.dispatch('updateNewTask', value)
      }
    },
    users (){
      return this.$store.getters.getUsers
    }
  },
  methods: {
    addTask(e) {
      e.preventDefault()
      this.$store.dispatch('addTask')
    }
  }
}
</script>
