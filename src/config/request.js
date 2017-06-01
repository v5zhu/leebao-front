/*var article=require('./request/article.js');
 console.log(article);*/

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
var request = [{
  module: 'user',
  name: '用户管理',
  list: require('./request/user.js')
}, {
  module: 'article',
  name: '文章管理',
  list: require('./request/article.js')
}, {
  module: 'order',
  name: '订单管理',
  list: require('./request/order.js')
}, {
  module: 'system',
  name: '系统设置',
  list: require('./request/system.js')
}, {
  module: 'open',
  name: '第三方接入',
  list: require('./request/open.js')
}, {
  module: 'area',
  name: '区域接口',
  list: require('./request/area.js')
}, {
  module: 'forbid',
  name: '禁忌接口',
  list: require('./request/forbid.js')
}, {
  module: 'star',
  name: '星级',
  list: require('./request/star.js')
}, {
  module: 'toutiao',
  name: '头条',
  list: require('./request/toutiao.js')
}];

module.exports = request;


