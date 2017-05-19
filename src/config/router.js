import {
	Login,
	Home,
	NotFound,
	Content,
	Modules
} from '../components/';

module.exports = [{
	path    : '/',
	redirect: to => {
		return 'login';
	},
	hidden  : true
}, {
	path     : '/login',
	component: Login,
	hidden   : true
}, {
	path     : '/404',
	component: Home,
	hidden   : true,
	children : [{
		path     : '',
		component: NotFound
	}]
}]
	.concat(require('./router/monitor.js'))
	.concat(require('./router/manage.js'))
	.concat(require('./router/components.js'))
	.concat(require('./router/advance.js'))
