import React from 'react';
import { useSelector } from 'react-redux';
import NavBarLeft from './navbar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const authSelector = useSelector(({ auth } : any) => auth);
  return (
      <div className="flex items-center h-screen">
        { authSelector.authenticated && (<NavBarLeft/>)}
        <div className="h-screen flex-grow">{children}</div>
      </div>
  );
};

export default DefaultLayout;