/* eslint-disable react/prop-types */
import UserNavbar from './components/UserNavbar/UserNavbar';

const Layout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  );
};

export default Layout;
