import { createApp } from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/Navigation/Navbar.vue';
import IconAdmin from '@/components/Icons/IconAdmin.vue';
import IconDown from '@/components/Icons/IconDown.vue';
import IconInfo from '@/components/Icons/IconInfo';
import IconStepPending from '@/components/Icons/IconStepPending';
import IconStepDone from '@/components/Icons/IconStepDone';
import IconLeftArrow from '@/components/Icons/IconLeftArrow';
import IconRightArrow from '@/components/Icons/IconRightArrow';
import IconUpdate from '@/components/Icons/IconUpdate';
import IconDelete from '@/components/Icons/IconDelete';
import IconEdit from '@/components/Icons/IconEdit';
import IconCross from '@/components/Icons/IconCross';
import IconError from '@/components/Icons/IconError';
import IconAlert from '@/components/Icons/IconAlert';
import '@/index.css';
import 'animate.css';
import router from '@/routes';
import store from '@/store/store';
import emitter from 'tiny-emitter/instance';

const app = createApp(App);

app.component('Navbar', Navbar);
app.component('IconAdmin', IconAdmin);
app.component('IconDown', IconDown);
app.component('IconInfo', IconInfo);
app.component('IconStepPending', IconStepPending);
app.component('IconStepDone', IconStepDone);
app.component('IconLeftArrow', IconLeftArrow);
app.component('IconRightArrow', IconRightArrow);
app.component('IconUpdate', IconUpdate);
app.component('IconDelete', IconDelete);
app.component('IconEdit', IconEdit);
app.component('IconCross', IconCross);
app.component('IconError', IconError);
app.component('IconAlert', IconAlert);

app.config.globalProperties.$eventHub = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}; //global event bus
app.provide('eventHub', app.config.globalProperties.$eventHub);

app.use(router);
app.use(store);

app.mount('#app');
