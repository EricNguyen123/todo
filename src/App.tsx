import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { App as AntdApp } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { itemRoutes } from "./routes";
import DefaultLayout from "./components/layout";
import { RouteType } from "./types/app";
import { currentUserID } from "./utils/user";

const publicRoutes: Array<RouteType> = [];
const privateRoutes: Array<RouteType> = [];

itemRoutes.forEach((e: RouteType) => {
  e.isPublic ? publicRoutes.push(e) : privateRoutes.push(e);
});

const App = () => {
  const [userLogin, setUserLogin] = useState(false);
  const authSelector = useSelector(({ auth }: any) => auth);
  const currentUserId = currentUserID();
  const navigate = useNavigate();

  const checkUserLoggedIn = () => (authSelector.authenticated ? true : false);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const isLoggedIn = await checkUserLoggedIn();
        setUserLogin(isLoggedIn);
        if (!isLoggedIn) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập của người dùng:', error);
      }
    };

    checkUserLogin();
  }, [authSelector.authenticated, currentUserId, navigate]);

  return (
    <AntdApp>
      <Routes>
        {!userLogin &&
          publicRoutes.map((routes, index) => {
            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <DefaultLayout>
                    <routes.component />
                  </DefaultLayout>
                }
              />
            );
          })}
        {userLogin &&
          privateRoutes.map((routes, index) => {
            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <DefaultLayout>
                    <routes.component />
                  </DefaultLayout>
                }
              />
            );
          })}
      </Routes>
    </AntdApp>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
