/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
  {
    name: '头条列表',
    method: 'pageList',
    path: '/toutiao/overview',
    type: 'post',
  }, {
    name: '头条作者列表',
    method: 'authorList',
    path: '/toutiao/authors',
    type: 'get',
  }
];
