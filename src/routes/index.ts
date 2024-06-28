import { RouteType } from '../types/app';

import config from '../config';
import { Register } from '../pages/register';
import { Login } from '../pages/login';
import Home from '../pages/home';
import TodoList from '../pages/todo-list';

const itemRoutes: Array<RouteType> = [
    {
        path: config.routes.register,
        component: Register,
        exact: true,
        isPublic: true,
    },
    {
        path: config.routes.login,
        component: Login,
        exact: true,
        isPublic: true,
    },
    {
      path: config.routes.home,
      component: Home,
      exact: true,
      isPublic: false,
    },
    {
        path: config.routes.todo_list,
        component: TodoList,
        exact: true,
        isPublic: false,
      },
];

export { itemRoutes };
