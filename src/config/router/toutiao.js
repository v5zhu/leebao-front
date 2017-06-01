/**
 * Created by vvboot on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/toutiao',
  name: '头条新闻',
  icon: 'inbox',
  component: Home,
  redirect: '/toutiao/pagelist',
  children: [{
    path: 'pagelist',
    name: '头条新闻',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '头条列表',
      icon: 'inbox',
      component: Modules.Toutiao
    }]
  }]
}];
