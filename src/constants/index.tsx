import { ScheduleOutlined, HomeOutlined, UserOutlined, LogoutOutlined, StarOutlined, CheckCircleOutlined, ClockCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useTranslation } from "react-i18next";

export const optionSortTodoList = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('todo');
  return [
    { value: '0', label: t("options.title") },
    { value: '1', label: t("options.date_asc") },
    { value: '2', label: t("options.date_desc") },
  ]
}

export const menuItem = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('auth');
  const dataUser = localStorage.data ? JSON.parse(localStorage.data) : undefined;
  return [
    {
      key: '1',
      icon: <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />,
      label: <span className="text-base font-medium">{dataUser[0].user_name}</span>,
      children: [
        { 
          key: 'logout', 
          label: t("btn.logout"),
          icon: <LogoutOutlined />,
        },
      ],
    },
    {
      key: '2',
      icon: <HomeOutlined />,
      label: t("label.home"),
    },
    {
      key: '3',
      icon: <ScheduleOutlined />,
      label: t("label.todo_list"),
      children: [
        { 
          key: '10', 
          label: t("btn.today"),
          icon: <StarOutlined style={{color: "rgb(132, 204, 22)"}}/>,
        },
        { 
          key: '11', 
          label: t("btn.tomorrow"),
          icon: <ClockCircleOutlined style={{color: "rgb(245, 158, 11)"}}/>,
        },
        { 
          key: '12', 
          label: t("btn.accomplished"),
          icon: <CheckCircleOutlined style={{color: "rgb(244, 63, 94)"}}/>,
        },
        { 
          key: '13', 
          label: t("btn.all"),
          icon: <InboxOutlined style={{color: "rgb(146, 64, 14)"}}/>,
        },
      ],
    },
  ]
}
