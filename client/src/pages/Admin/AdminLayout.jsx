/* eslint-disable react/prop-types */

import AdminNavbar from './AdminComponents/AdminNavbar/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
