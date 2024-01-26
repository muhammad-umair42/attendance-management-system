/* eslint-disable react/prop-types */
import img from '../../../assets/images.jpg';
import './UserCard.css';
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card__img">
        <img src={user?.profilePicture || img} alt="" />
      </div>
      <div className="user-card-details">
        <div>
          <span>Username:</span> <span>{user?.username}</span>
        </div>
        <div>
          <span>Full Name:</span> <span>{user?.fullName}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
