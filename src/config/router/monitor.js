/**
 * Created by sailengsi on 2017/4/30.
 */
import {
  Home,
  Content,
  Modules
} from '../../components/';

module.exports = [{
  path: '/monitor',
  name: '数据监控',
  icon: 'inbox',
  component: Home,
  redirect: '/monitor/news',
  children: [{
    path: 'news',
    name: '新闻监控',
    icon: 'inbox',
    component: Content,
    redirect: '/monitor/news/visitor',
    children: [{
      path: 'visitor',
      name: '访问量统计',
      icon: 'bar-chart',
      component: Modules.Function.Open.Echarts
    }]
  }, {
    path: 'order',
    name: '订单监控',
    icon: 'inbox',
    component: Content,
    redirect: '/monitor/order/bar',
    children: [{
      path: 'bar',
      name: '柱状图监控',
      icon: 'reorder',
      component: Modules.Demo.OrderStatis.Bar
    }, {
      path: 'pie',
      name: '饼状图监控',
      icon: 'edit',
      component: Modules.Demo.OrderStatis.Pie
    }]
  }]
}];
