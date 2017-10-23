/**
 * 定时任务模块
 * @type {Object}
 */
module.exports = [
  {
    name: 'spring bean 列表',
    method: 'names',
    path: '/bean/names',
    type: 'get',
  },
  {
    name: 'spring bean class',
    method: 'fullname',
    path: '/bean/fullname',
    type: 'get',
  },
  {
    name: 'spring bean class methods',
    method: 'methods',
    path: '/bean/class/methods',
    type: 'get',
  }
];
