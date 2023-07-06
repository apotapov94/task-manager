<template>
  <div class="add-task-form">
    <form @submit.prevent="addTask">
      <AppInput 
        placeholder="Название" 
        v-model="title"
        :class="{ error: v$.title.$error }"
        @change="v$.title.$touch()"
        :errors="v$.title.$errors">
      </AppInput>
      <div class="input-group">
        <select name="priority" v-model="priority">
          <option value="standart" selected>Стандартный</option>
          <option value="high">Повышенный</option>
          <option value="very-high">Высокий</option>
        </select>
      </div>
      <div class="input-group">
        <select 
          name="executor" 
          v-model="executor" 
          :class="{ error: v$.executor.$error }"
          @change="v$.executor.$touch()">
          <option value="" selected>Выбрать исполнителя</option>
          <option v-for="user in users" :value="user.id">{{ user.name }}</option>
        </select>
        <p class="error-text" v-for="error of v$.executor.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
      <div class="input-group">
        <select 
          name="project" 
          v-model="project">
          <option value="" selected>Выбрать проект</option>
          <option v-for="project in projects" :value="project.id">{{ project.title }}</option>
        </select>
      </div>
      <AppInput 
        type="date" 
        v-model="date" 
        placeholder="Дата"
        :class="{ error: v$.date.$error }"
        @change="v$.date.$touch()"
        :errors="v$.date.$errors">
      </AppInput>
      <AppTextArea placeholder="Описание" v-model="descr"></AppTextArea>
      <AppButton>Добавить задачу</AppButton>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      title: { 
        required: helpers.withMessage('Поле обязательно для заполнения', required)
      },
      executor: { 
        required: helpers.withMessage('Поле обязательно для заполнения', required)
      },
      date: { 
        required: helpers.withMessage('Поле обязательно для заполнения', required)
      },
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.getters.getTitle
      },
      set(value) {
        this.$store.dispatch('updateTitle', value)
      }
    },
    priority: {
      get() {
        return this.$store.getters.getPriority
      },
      set(value) {
        this.$store.dispatch('updatePriority', value)
      }
    },
    executor: {
      get() {
        return this.$store.getters.getExecutor
      },
      set(value) {
        this.$store.dispatch('updateExecutor', value)
      }
    },
    project: {
      get() {
        return this.$store.getters.getProject
      },
      set(value) {
        this.$store.dispatch('updateProject', value)
      }
    },
    date: {
      get() {
        return this.$store.getters.getDate
      },
      set(value) {
        this.$store.dispatch('updateDate', value)
      }
    },
    descr: {
      get() {
        return this.$store.getters.getDescr
      },
      set(value) {
        this.$store.dispatch('updateDescr', value)
      }
    },
    users (){
      return this.$store.getters.getUsers
    },
    projects (){
      return this.$store.getters.getProjects
    }
  },
  methods: {
    addTask() {
      this.v$.$touch()
      if(!this.v$.$invalid){
        this.$store.dispatch('addTask')
        this.v$.$reset()
        this.$store.dispatch('addTaskFormReset')
      }
      
    }
  }
}
</script>
