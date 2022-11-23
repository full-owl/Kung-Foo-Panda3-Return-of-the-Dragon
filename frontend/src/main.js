import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'
// import MyModal from './components/MyModal'
// import MenuItems from './components/MenuItems'
// import RecieptTable from './components/RecieptTable'
import router from './router' 

// loadFonts()

createApp(App)
  .use(vuetify)
  // .use('MyModal', MyModal)
  // .use('MenuItems',MenuItems)
  // .use('RecieptTable', RecieptTable)
  .use(router)
  .mount('#app')
