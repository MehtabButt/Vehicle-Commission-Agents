import { createApp } from 'vue';
import App from '@/renderer/App.vue';
import Navbar from '@/renderer/components/Navigation/Navbar.vue';
import IconAdmin from '@/renderer/components/Icons/IconAdmin.vue';
import IconDown from '@/renderer/components/Icons/IconDown.vue';
import IconInfo from '@/renderer/components/Icons/IconInfo';
import IconInfoOutlined from '@/renderer/components/Icons/IconInfoOutlined';
import IconStepPending from '@/renderer/components/Icons/IconStepPending';
import IconStepDone from '@/renderer/components/Icons/IconStepDone';
import IconLeftArrow from '@/renderer/components/Icons/IconLeftArrow';
import IconRightArrow from '@/renderer/components/Icons/IconRightArrow';
import IconUpdate from '@/renderer/components/Icons/IconUpdate';
import IconDelete from '@/renderer/components/Icons/IconDelete';
import IconEdit from '@/renderer/components/Icons/IconEdit';
import IconCross from '@/renderer/components/Icons/IconCross';
import IconError from '@/renderer/components/Icons/IconError';
import IconAlert from '@/renderer/components/Icons/IconAlert';
import IconPersonal from '@/renderer/components/Icons/IconPersonal';
import IconBusiness from '@/renderer/components/Icons/IconBusiness';
import IconSave from '@/renderer/components/Icons/IconSave';
import IconExport from '@/renderer/components/Icons/IconExport';
import IconImport from '@/renderer/components/Icons/IconImport';

import '@/renderer/index.css';
import 'animate.css';
import router from '@/renderer/routes';
import store from '@/renderer/store/store';
import emitter from 'tiny-emitter/instance';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);

app.component('Navbar', Navbar);
app.component('IconAdmin', IconAdmin);
app.component('IconDown', IconDown);
app.component('IconInfo', IconInfo);
app.component('IconInfoOutlined', IconInfoOutlined);
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
app.component('IconPersonal', IconPersonal);
app.component('IconBusiness', IconBusiness);
app.component('IconSave', IconSave);
app.component('IconExport', IconExport);
app.component('IconImport', IconImport);

app.config.globalProperties.$eventHub = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}; //global event bus
app.provide('eventHub', app.config.globalProperties.$eventHub);

app.use(router);
app.use(store);
app.use(Notifications);

app.mount('#app');
