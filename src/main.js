import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseForm from './components/ui/BaseForm.vue'
import BaseInput from './components/ui/BaseInput.vue'
import './assets/tailwind.css'

const app = createApp(App)
app.component('base-button', BaseButton)
app.component('base-form', BaseForm)
app.component('base-input', BaseInput)
app.mount('#app')
