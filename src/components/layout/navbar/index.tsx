import { useEffect, useState } from 'react';
import { MenuProps, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { keyPathMapping, menuItem } from '../../../constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/actions';
import { MenuNavigation } from '../../../common/general';

type MenuItem = Required<MenuProps>['items'][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

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

  return MenuNavigation.HOME;
};

const NavBarLeft = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get('key');
  const [stateOpenKeys, setStateOpenKeys] = useState([getKeyFromPath(location.pathname + `?${queryParams}`)]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items: MenuItem[] = menuItem();
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  useEffect(() => {
    key ? setStateOpenKeys([getKeyFromPath(location.pathname + `?key=${key}`)]) :
    setStateOpenKeys([getKeyFromPath(location.pathname + `?${queryParams}`)])
  }, [queryParams]);
  
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
    if(e.key === MenuNavigation.LOGOUT) {
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
      selectedKeys={stateOpenKeys}
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
