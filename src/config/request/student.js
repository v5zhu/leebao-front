/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
  {
    name: '添加学生',
    method: 'save',
    path: '/student/save',
    type: 'post',
  }, {
    name: '学生下拉框',
    method: 'dropdown',
    path: '/student/dropdown',
    type: 'get',
  },{
    name: '学生列表',
    method: 'list',
    path: '/student/list',
    type: 'post',
  }
];
