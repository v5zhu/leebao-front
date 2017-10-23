/**
 * 定时任务模块
 * @type {Object}
 */
module.exports = [
  {
    name: '添加task',
    method: 'addTask',
    path: '/task/add',
    type: 'post',
  }, {
    name: '编辑task',
    method: 'editTask',
    path: '/task/edit',
    type: 'post',
  }, {
    name: 'task列表',
    method: 'taskList',
    path: '/task/all',
    type: 'get',
  }
];
