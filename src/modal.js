import { createApp } from 'vue'

import ModalParent from './components/ModalParent.vue'
import ModalChild from './components/ModalChild.vue'

const app = createApp(ModalParent)

app.component('modal-window', ModalChild);

app.mount('#app')