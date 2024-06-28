import { useState } from 'react';
import { MenuProps, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import config from '../../../config';
import { menuItem } from '../../../constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/actions';

type MenuItem = Required<MenuProps>['items'][number];


interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const keyPathMapping: Record<string, string> = {
  '2': config.routes.home,
  '10': config.routes.todo_list + `?key=today`,
  '11': config.routes.todo_list + `?key=tomorrow`,
  '12': config.routes.todo_list + `?key=accomplished`,
  '13': config.routes.todo_list + `?key=all`,
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const getKeyFromPath = (path: string): string => {
  // const cleanPath = path.split('?')[0];

  for (const [key, route] of Object.entries(keyPathMapping)) {
    if (path === route) {
      return key;
    }
  }

  return '2';
};

const NavBarLeft = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [stateOpenKeys, setStateOpenKeys] = useState([getKeyFromPath(location.pathname + `?${queryParams}`)]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items: MenuItem[] = menuItem();
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);
  
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const handleRedirectPage = (path: string) => {
    navigate(path);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    if(e.key === "logout") {
      dispatch(logout({handleRedirectPage}))
    }
    
    const path = keyPathMapping[e.key];
    if (path) {
      navigate(path);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={stateOpenKeys}
      // openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      style={{ 
        width: 256,
        height: "100vh"
      }}
      items={items}
    />
  )
}

export default NavBarLeft
