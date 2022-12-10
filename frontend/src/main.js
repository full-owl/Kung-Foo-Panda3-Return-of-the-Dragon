import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'
// import MyModal from './components/MyModal'
// import MenuItems from './components/MenuItems'
// import RecieptTable from './components/RecieptTable'
import router from './router' 
import gAuthPlugin from 'vue3-google-oauth2';
// loadFonts()
const app = createApp(App).use(router);

let gauthClientId = '752431398514-7sg211luu4kccppqknilib6dupjq49i4.apps.googleusercontent.com';
app.use(vuetify);

app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
});
  // .use('MyModal', MyModal)
  // .use('MenuItems',MenuItems)
  // .use('RecieptTable', RecieptTable)
app.mount('#app');
