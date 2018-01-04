import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCA6GXPc2Ho5WGFiPEFJqC7LqUy_2pMs34',
      authDomain: 'vue-vuetify-firebase-project.firebaseapp.com',
      databaseURL: 'https://vue-vuetify-firebase-project.firebaseio.com',
      projectId: 'vue-vuetify-firebase-project',
      storageBucket: 'vue-vuetify-firebase-project.appspot.com'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
