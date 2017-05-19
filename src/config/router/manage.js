/**
 * Created by sailengsi on 2017/4/30.
 */
import {
	Home,
	Content,
	Modules
} from '../../components/';

module.exports = [{
	path: '/manage',
	name: '系统管理',
	icon: 'inbox',
	component: Home,
	redirect: '/manage/user',
	children: [{
		path: 'user',
		name: '用户管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/user/list',
		children: [{
			path: 'list',
			name: '用户列表',
			icon: 'reorder',
			component: Modules.Demo.User.List
		}, {
			path: 'edit',
			name: '编辑用户',
			icon: 'edit',
			component: Modules.Demo.User.Edit
		}, {
			path: 'access',
			hidden:true,
			name: '设置权限',
			icon: 'edit',
			component: Modules.Demo.User.Access
		}]
	}, {
		path: 'article',
		name: '文章管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/article/list',
		children: [{
			path: 'list',
			name: '文章列表',
			icon: 'reorder',
			component: Modules.Demo.Article.List
		}, {
			path: 'edit',
			name: '编辑文章',
			icon: 'edit',
			component: Modules.Demo.Article.Edit
		}]
	}, {
		path: 'order',
		name: '订单管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/order/list',
		children: [{
			path: 'list',
			name: '订单列表',
			icon: 'reorder',
			component: Modules.Demo.Order.List
		}, {
			path: 'edit',
			name: '编辑订单',
			icon: 'edit',
			component: Modules.Demo.Order.Edit
		}]
	}]
}];
