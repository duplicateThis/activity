import Vue from 'vue'

// import
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Row,
  Col,
  Message,
  MessageBox,
  Dialog,
  Cascader,
  DatePicker,
  Tag,
  Radio,
  Upload,
  Checkbox,
  CheckboxGroup,
  Table,
  TableColumn,
  Icon
} from 'element-ui'

// use
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Tag)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
