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
    name  : '禁忌类型下拉框',
    method: 'typeList',
    path  : '/forbid/type/dropdown',
    type  : 'get',
  }
];
