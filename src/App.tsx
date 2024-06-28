import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  e.isPublic
    ? publicRoutes.push(e)
    : privateRoutes.push(e);
});

const App = () => {
  const [userLogin, setUserLogin] = useState(false);
  const authSelector = useSelector(({ auth }: any) => auth);
  const checkUserLoggedIn = () => (authSelector.authenticated ? true : false);
  const currentUserId = currentUserID();
  useEffect(() => {
    const checkUserLogin = async () => {
        try {
            const isLoggedIn = await checkUserLoggedIn();
            setUserLogin(isLoggedIn);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái đăng nhập của người dùng:', error);
        }
    };

    checkUserLogin();
  }, [authSelector.authenticated, currentUserId]);

  return (
    <BrowserRouter>
      <AntdApp>
        <Routes>
          {!userLogin && publicRoutes.map((routes, index) => {
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
          {userLogin && privateRoutes.map((routes, index) => {
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
    </BrowserRouter>
  )
}

export default App
