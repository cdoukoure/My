// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import { DataTablesServer } from 'vue-data-tables'

import store from './store'
import router from './router'
import App from './App'

import fullCalendar from 'vue-fullcalendar'

/* Pour le quiz */
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import draggable from 'vuedraggable'

import VueI18n from 'vue-i18n'

/*
import {
  // Pagination,
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  // Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Badge,
  // Card,
  // Rate,
  Steps,
  Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  // Notification
} from 'element-ui';

// Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Tag);
// Vue.use(Tree);
// Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
// Vue.use(Upload);
Vue.use(Progress);
// Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

*/

Vue.use(ElementUI, { locale })

Vue.use(DataTablesServer)

Vue.component('full-calendar', fullCalendar)

Vue.use(VueCodemirror)

Vue.use(draggable)

Vue.use(VueI18n)

Vue.config.productionTip = false

Vue.config.devtools = true

/*
Vue.use(VueAnalytics, {
    appName: 'Vue-ChuckAdmin',
    appVersion: '1.0.0',
    trackingId: 'UA-9271946-13',
    debug: false,
    vueRouter: router

    // If router, you can exclude some routes name (case insensitive) (optional)
    // ignoredViews: ['homepage'],
})
*/

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/*
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
*/

new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
