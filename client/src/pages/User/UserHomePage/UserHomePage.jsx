import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserHomePage = () => {
  const user = useSelector(state => state?.user);
  useEffect(() => {}, []);
  return <div>user</div>;
};

export default UserHomePage;
