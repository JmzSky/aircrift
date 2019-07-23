import Button from './button'
import Switch from './switch'
import Cell from './cell'
import Header from './header'
import TabItem from './tab-item'
import TabContainerItem from './tab-container-item'
import TabContainer from './tab-container'
import Tabbar from './tabbar'
import Popup from './popup'
import Picker from './picker'
import Range from './range'
import Actionsheet from './actionsheet'
import MessageBox from './message-box'
import Loadmore from './loadmore'
import DatetimePicker from './datetime-picker'
import Toast from './toast'
import Indicator from './indicator'

// import SwiperSlide from './swiper/slide.vue'
// import Swiper from './swiper/swiper.vue'

//手机端响应式
require('./lib-flexible/flexible')

const version = '0.0.1';
const install = function(Vue, config) {
  if (install.installed) return;
  Vue.component(Button.name, Button);
  Vue.component(Switch.name, Switch);
  Vue.component(Cell.name, Cell);
  Vue.component(Header.name, Header);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(Popup.name, Popup);
  Vue.component(Picker.name, Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(Actionsheet.name, Actionsheet);
  Vue.component(Range.name, Range);
  Vue.component(Loadmore.name, Loadmore);

  // if (config) {
  //   Swiper.props.config.default = () => config
  // }
  // Vue.component(Swiper.name, Swiper)
  // Vue.component(SwiperSlide.name, SwiperSlide)

  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  version,
  Button,
  Switch,
  Cell,
  TabItem,
  TabContainerItem,
  TabContainer,
  Tabbar,
  Toast,
  Indicator,
  Popup,
  Picker,
  DatetimePicker,
  Actionsheet,
  MessageBox,
  Range,
  Loadmore,
  // Swiper,
  // SwiperSlide,
};
