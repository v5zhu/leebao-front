/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
  {
    name: '录入加班',
    method: 'saveOvertime',
    path: '/overtime/save',
    type: 'post',
  }, {
    name: '加班列表',
    method: 'list',
    path: '/overtime/list',
    type: 'post',
  }
];
