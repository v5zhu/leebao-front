/**
 * Created by vvboot on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/pregnancy',
  name: '孕育经典',
  icon: 'inbox',
  component: Home,
  redirect: '/pregnancy/forbidden',
  children: [{
    path: 'forbidden',
    name: '孕期禁忌',
    icon: 'inbox',
    component: Content,
    redirect: '/pregnancy/forbidden',
    children: [{
      path: '',
      name: '孕期禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Radiation
    }]
  }, {
    path: 'cookbook',
    name: '孕期食谱',
    icon: 'inbox',
    component: Content,
    redirect: '/pregnancy/cookbook/fifthweek',
    children: [{
      path: 'fifthweek',
      name: '孕5周',
      icon: 'reorder',
      component: Modules.Demo.OrderStatis.Bar
    }, {
      path: 'sixweek',
      name: '饼状图监控',
      icon: 'edit',
      component: Modules.Demo.OrderStatis.Pie
    }]
  }]
}];
