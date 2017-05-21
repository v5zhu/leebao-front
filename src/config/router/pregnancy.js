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
    redirect: '/pregnancy/forbidden/conflict',
    children: [{
      path: 'conflict',
      name: '食物搭配冲突',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Conflict
    }, {
      path: 'radiation',
      name: '孕期防辐射禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Radiation
    }, {
      path: 'diet',
      name: '孕期饮食禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Diet
    }, {
      path: 'fruit',
      name: '孕期水果禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Fruit
    }, {
      path: 'life',
      name: '孕期生活禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Life
    }, {
      path: 'medicine',
      name: '孕期用药禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Medicine
    }, {
      path: 'clothing',
      name: '孕期衣着禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Clothing
    }, {
      path: 'sexual',
      name: '孕期性生活禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Sexual
    }, {
      path: 'sport',
      name: '孕期运动禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Sport
    }, {
      path: 'lyingin',
      name: '孕期月子禁忌',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Lyingin
    }, {
      path: 'work',
      name: '孕期上班注意事项',
      icon: 'bar-chart',
      component: Modules.Pregnancy.Forbidden.Work
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
