import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import MenuItems from './components/MenuItems'
import RecieptTable from './components/RecieptTable'

loadFonts()

createApp(App)
  .use(vuetify)
  .use('MenuItems',MenuItems)
  .use('RecieptTable', RecieptTable)
  .mount('#app')
