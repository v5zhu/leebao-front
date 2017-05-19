/**
 * Created by sailengsi on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [
  {
    path: '/advance',
    name: '高级实战',
    icon: 'inbox',
    component: Home,
    redirect: '/advance/third',
    children: [
      {
        path: 'third',
        name: '第三方接入',
        icon: 'inbox',
        component: Content,
        redirect: '/advance/third/qiniu',
        children: [{
          path: 'qiniu',
          name: '七牛',
          icon: 'reorder',
          component: Modules.Adv.Open.Qiniu
        }]
      }]
  }];
