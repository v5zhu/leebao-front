/**
 * Created by vvboot on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/overtime',
  name: '加班信息',
  icon: 'inbox',
  component: Home,
  redirect: '/overtime/list',
  children: [{
    path: 'list',
    name: '加班管理',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '录入加班',
      icon: 'inbox',
      component: Modules.Overtime
    }]
  }]
}];
