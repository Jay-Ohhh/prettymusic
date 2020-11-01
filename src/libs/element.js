// import Vue from 'vue'

import {
  Image,
  Slider,
  Tooltip,
  Message,
  Input,
  Form,
  FormItem,
  Button,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Pagination,
  MessageBox,
} from 'element-ui'

Vue.use(Image)
Vue.use(Slider)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
Vue.use(Pagination)
// Message不要用Vue.use，会自动触发
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)

Vue.prototype.$msg = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
