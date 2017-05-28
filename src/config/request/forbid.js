/**
 * 区域模块
 * @type {Object}
 */
module.exports = [
	{
		name  : '保存禁忌',
		method: 'saveForbid',
		path  : '/forbid/save',
		type  : 'post',
	},
  {
    name  : '禁忌分页列表',
    method: 'pageList',
    path  : '/forbid/pagelist',
    type  : 'get',
  },
  {
    name  : '禁忌详情',
    method: 'detail',
    path  : '/forbid/detail',
    type  : 'get',
  },
  {
    name  : '删除禁忌',
    method: 'delete',
    path  : '/forbid/delete',
    type  : 'delete',
  },
  {
    name  : '修改',
    method: 'updateForbid',
    path  : '/forbid/update',
    type  : 'put',
  },
  {
    name  : '禁忌类型下拉框',
    method: 'typeList',
    path  : '/forbid/type/dropdown',
    type  : 'get',
  }
];
