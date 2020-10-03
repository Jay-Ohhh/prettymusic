import Vue from 'vue'

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
// Message不要用Vue.use，会自动触发
Vue.component(Message.name, Message)

Vue.prototype.$msg = Message
