/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import alternativeImage from '../../../assets//images.jpg';
import makeApiRequest from '../../api/axios';
import './UserProfileCard.css';

const UserProfileCard = () => {
  //states and variables
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    username: user?.username,
    fullName: user?.fullName,
    securityKey: user?.securityKey,
  });
  const [password, setPassword] = useState('');
  const fileInputRef = useRef(null);

  //functions
  //handle new profile
  // Trigrring input on base of clicking btn
  const handleClick = () => {
    fileInputRef.current.click();
  };

  //Handling the change in input field - saving selected file to state
  const handleProfileChange = e => {
    e.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);
    setNewProfilePicture(formData); //
  };

  //making Api request to update profile picture in database
  const handleUpdateProfile = async () => {
    //If File Not Selected
    if (!newProfilePicture)
      return toast.error('Please Select a Profile Picture');

    //Req Params for custom Api
    const reqParams = {
      method: 'put',
      url: `/user/updateprofilepicture/${user._id}`,
      reqType: 'updateprofilepicture',
      reqData: newProfilePicture,
      dispatch,
    };

    //Api Req for updating profile picture
    const { success, reqData } = await toast.promise(
      makeApiRequest(reqParams),
      { pending: 'Wait! Updating Profile Picture' },
    );

    //If Success
    if (success) {
      setNewProfilePicture(null);
      toast.success('Profile Picture Updated Successfully');
      return;
    }
  };

  //update user details
  const handleUpdateUserDetails = async e => {
    e.preventDefault();
    //Req Params for custom Api
    const reqParams = {
      method: 'put',
      url: `/user/updateuser/${user._id}`,
      reqType: 'updateuser',
      reqData: updatedUserDetails,
      dispatch,
    };

    //Api Req for updating profile picture
    const { success, reqData } = await toast.promise(
      makeApiRequest(reqParams),
      { pending: 'Wait! Updating User Details' },
    );
    if (success) {
      return location.reload();
    }
  };
  const handleUpdatePassword = async e => {
    e.preventDefault();
    if (password == '') {
      return toast.error('Enter Password');
    }

    const reqParams = {
      method: 'put',
      reqData: { password: password },
      url: `/user/updatepassword/${user._id}`,
    };

    const { success } = await toast.promise(makeApiRequest(reqParams), {
      pending: 'Updaing Password',
    });

    if (success) {
      return toast.success('Updated passoword');
    }
  };
  return (
    <div className="user-profile__card">
      <h2>Profile</h2>
      {/* -----------Profile Picture---------------- */}
      <div className="card__profile-pic">
        <img
          src={
            user?.profilePicture ? `${user.profilePicture}` : alternativeImage
          }
          alt=""
        />

        <div className="profile-pic__btns">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfileChange}
          />

          {!newProfilePicture ? (
            <button className="profile-pic__btn" onClick={handleClick}>
              Upload New
            </button>
          ) : (
            <span>Image Selected</span>
          )}

          {newProfilePicture && (
            <button
              className="profile-pic__btn-update"
              onClick={handleUpdateProfile}
            >
              Update Now
            </button>
          )}
        </div>
      </div>

      {/* -----------User Details------------------ */}
      <div className="user__card-details">
        <div className="card__details-input-box">
          <span>Username: </span>
          <input
            type="text"
            className="card__details-input"
            value={updatedUserDetails.username}
            onChange={e =>
              setUpdatedUserDetails({
                ...updatedUserDetails,
                username: e.target.value,
              })
            }
          />
        </div>

        <div className="card__details-input-box">
          <span>FullName: </span>
          <input
            type="text"
            className="card__details-input"
            value={updatedUserDetails.fullName}
            onChange={e =>
              setUpdatedUserDetails({
                ...updatedUserDetails,
                fullName: e.target.value,
              })
            }
          />
        </div>

        <div className="card__details-input-box">
          <span>Security Key: </span>
          <input
            type="text"
            className="card__details-input"
            value={updatedUserDetails.securityKey}
            onChange={e =>
              setUpdatedUserDetails({
                ...updatedUserDetails,
                securityKey: e.target.value,
              })
            }
          />
        </div>

        <button
          className="user__card-details__btn"
          onClick={handleUpdateUserDetails}
        >
          Update Details
        </button>
      </div>

      {/* ------------User Passowrd----------------- */}
      <div className="user__card-passwords">
        <div className="card__password-input-box">
          <span>New Password: </span>
          <input
            type="password"
            className="card__password-input"
            placeholder="Change Current Password?"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="user__card-passwords__btn"
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
