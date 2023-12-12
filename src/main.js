import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css';
// Import the necessary Font Awesome packages
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the solid icons to the library
library.add(fas);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
