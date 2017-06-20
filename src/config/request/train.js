/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
  {
    name: '添加培训记录',
    method: 'save',
    path: '/train/save',
    type: 'post',
  },{
    name: '培训记录列表',
    method: 'list',
    path: '/train/list',
    type: 'post',
  }
];
