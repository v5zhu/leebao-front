/**
 * Created by vvboot on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/train',
  name: '培训记录',
  icon: 'inbox',
  component: Home,
  redirect: '/train/list',
  children: [{
    path: 'list',
    name: '培训记录管理',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '培训记录',
      icon: 'inbox',
      component: Modules.Train
    },]
  },{
    path: 'organization',
    name: '培训机构管理',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '培训机构',
      icon: 'inbox',
      component: Modules.SchoolOrganization
    },]
  },{
    path: 'student',
    name: '学生管理',
    icon: 'inbox',
    component: Content,
    children: [{
      path: '',
      name: '学生管理',
      icon: 'inbox',
      component: Modules.Student
    },]
  }]
}];
