/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
  {
    name: '添加机构',
    method: 'save',
    path: '/school/organization/save',
    type: 'post',
  }, {
    name: '机构下拉框',
    method: 'dropdown',
    path: '/school/organization/dropdown',
    type: 'get',
  },{
    name: '机构列表',
    method: 'list',
    path: '/school/organization/list',
    type: 'post',
  }
];
