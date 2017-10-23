/**
 * Created by vvboot on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/task',
  name: '定时任务',
  icon: 'inbox',
  component: Home,
  redirect: '/task/list',
  children: [{
    path: 'list',
    name: '任务管理',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '任务管理',
      icon: 'inbox',
      component: Modules.Task
    }]
  }]
}];
