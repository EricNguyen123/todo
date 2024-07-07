import { ScheduleOutlined, HomeOutlined, UserOutlined, LogoutOutlined, StarOutlined, CheckCircleOutlined, ClockCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useTranslation } from "react-i18next";
import { MenuNavigation, RelativeTime, SelectTodo } from '../common/general';
import { SelectTodoOptionsType, StylesCardTodoType } from '../types/app';
import config from '../config';

export const SelectTodoOptions: SelectTodoOptionsType = {
  [SelectTodo.TITLE]: { sortBy: 'title', order: 'asc' },
  [SelectTodo.DATE_ASC]: { sortBy: 'date', order: 'asc' },
  [SelectTodo.DATE_DESC]: { sortBy: 'date', order: 'desc' },
}

export const optionSortTodoList = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('todo');
  return [
    { value: SelectTodo.TITLE, label: t("options.title") },
    { value: SelectTodo.DATE_ASC, label: t("options.date_asc") },
    { value: SelectTodo.DATE_DESC, label: t("options.date_desc") },
  ]
}

export const menuItem = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('auth');
  const dataUser = localStorage.data ? JSON.parse(localStorage.data) : undefined;
  return [
    {
      key: MenuNavigation.USER,
      icon: <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />,
      label: <span className="text-base font-medium">{dataUser[0].user_name}</span>,
      children: [
        { 
          key: MenuNavigation.LOGOUT, 
          label: t("btn.logout"),
          icon: <LogoutOutlined />,
        },
      ],
    },
    {
      key: MenuNavigation.HOME,
      icon: <HomeOutlined />,
      label: t("label.home"),
    },
    {
      key: MenuNavigation.TODO_LIST,
      icon: <ScheduleOutlined />,
      label: t("label.todo_list"),
      children: [
        { 
          key: MenuNavigation.TODAY, 
          label: t("btn.today"),
          icon: <StarOutlined style={{color: "rgb(132, 204, 22)"}}/>,
        },
        { 
          key: MenuNavigation.TOMORROW, 
          label: t("btn.tomorrow"),
          icon: <ClockCircleOutlined style={{color: "rgb(245, 158, 11)"}}/>,
        },
        { 
          key: MenuNavigation.ACCOMPLISHED, 
          label: t("btn.accomplished"),
          icon: <CheckCircleOutlined style={{color: "rgb(244, 63, 94)"}}/>,
        },
        { 
          key: MenuNavigation.ALL_TODO, 
          label: t("btn.all"),
          icon: <InboxOutlined style={{color: "rgb(146, 64, 14)"}}/>,
        },
      ],
    },
  ]
}

export const keyParams = {
  today: "today",
  tomorrow: "tomorrow",
  accomplished: "accomplished",
  all: "all",
}

export const keyPathMapping: Record<string, string> = {
  [MenuNavigation.HOME]: config.routes.home,
  [MenuNavigation.TODAY]: config.routes.todo_list + `?key=${keyParams.today}`,
  [MenuNavigation.TOMORROW]: config.routes.todo_list + `?key=${keyParams.tomorrow}`,
  [MenuNavigation.ACCOMPLISHED]: config.routes.todo_list + `?key=${keyParams.accomplished}`,
  [MenuNavigation.ALL_TODO]: config.routes.todo_list + `?key=${keyParams.all}`,
};

export const stylesCardTodo: StylesCardTodoType = {
  [RelativeTime.YESTERDAY]: `text-violet-500`,
  [RelativeTime.TODAY]: `text-lime-500`,
  [RelativeTime.TOMORROW]: `text-yellow-500`,
  [RelativeTime.ACCOMPLISHED]: `text-rose-500`,
  [RelativeTime.EXIT]: `text-slate-300`,
  [RelativeTime.OTHER]: `text-slate-300`,
}

export const stylesBorderCardTodo: StylesCardTodoType = {
  [RelativeTime.YESTERDAY]: `border-violet-500`,
  [RelativeTime.TODAY]: `border-lime-500`,
  [RelativeTime.TOMORROW]: `border-yellow-500`,
  [RelativeTime.ACCOMPLISHED]:  `border-rose-500`,
  [RelativeTime.EXIT]: `border-slate-300`,
  [RelativeTime.OTHER]: `border-slate-300`,
}
