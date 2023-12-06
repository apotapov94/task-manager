//import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// UI
import AppButton from '@/components/UI/Controls/Button.vue'
import AppInput from '@/components/UI/Controls/Input.vue'
import AppTextArea from '@/components/UI/Controls/TextArea.vue'
import Loader from '@/components/UI/Loader.vue'
import Message from '@/components/UI/Message.vue'

const app = createApp(App)

app.use(router).use(store)

app.component('AppButton', AppButton)
app.component('AppInput', AppInput)
app.component('AppTextArea', AppTextArea)
app.component('Loader', Loader)
app.component('Message', Message)

app.mount('sales-widget')
