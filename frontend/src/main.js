import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'
// import MyModal from './components/MyModal'
// import MenuItems from './components/MenuItems'
// import RecieptTable from './components/RecieptTable'
import router from './router' 
import gAuthPlugin from 'vue3-google-login';
// loadFonts()
const app = createApp(App).use(router);

let gauthClientId = '396424221675-aoju1qsact7u2qf2jon9r93pie6b5sgo.apps.googleusercontent.com';
app.use(vuetify);

app.use(gAuthPlugin, {
  clientId: gauthClientId,
});
  // .use('MyModal', MyModal)
  // .use('MenuItems',MenuItems)
  // .use('RecieptTable', RecieptTable)
app.mount('#app');
