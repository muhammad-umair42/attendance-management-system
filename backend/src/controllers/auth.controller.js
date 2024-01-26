import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { handleLoginHistory } from '../utils/createLoginHistory.js';
import { generateTodayDates } from '../utils/generateTodayDates.js';
import { LoginHistory } from './../models/loginHistory.model.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, key, password } = req.body;
  const securityKey = key;

  //Checking all fields
  if (!fullName || !username || !securityKey || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  //Checking existing users
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    throw new ApiError(201, 'Username Already Exists.');
  }

  //Creating new user
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    securityKey,
    password,
  });

  //Checking User created?
  if (!user) {
    throw new ApiError(500, 'User Creation Failed');
  }

  res.status(201).json(new ApiResponse(201, {}, 'Registered Successfully'));
});

export const recoverAccount = asyncHandler(async (req, res) => {
  //Getting Data
  const { key, username, password } = req.body;
  const securityKey = key;

  // Validating fields
  if (!key || !username || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  //Checking if user exists
  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new ApiError(404, 'User Not Found');
  }

  //Checking security key
  if (user.securityKey !== securityKey) {
    throw new ApiError(401, 'Invalid Security Key');
  }

  //Updating Password and user
  user.password = password;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password Updated Successfully'));
});

export const loginUser = asyncHandler(async (req, res) => {
  //Checking all fields
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'All fields are required');
  }
  //Finding User
  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new ApiError(404, 'User Not Found');
  }
  //Checking Password
  const isMatch = await user.isPasswordCorrect(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid Credentials');
  }
  //Generating Token

  const accessToken = await user.generateAccessToken();

  if (!accessToken) {
    throw new ApiError(500, 'Token Generation Failed');
  }
  //Handling login

  const isLoginHistoryHandled = await handleLoginHistory(user);

  if (!isLoginHistoryHandled) {
    throw new ApiError(500, 'something went wrong in Login History Handling');
  }

  //Sending Response
  // Calculate the time remaining until the end of the day
  const { currentDate, todayStart, todayEnd } = generateTodayDates();

  const timeRemaining = todayEnd.getTime() - currentDate.getTime();

  const cookieOptions = {
    maxAge: timeRemaining,
    httpOnly: true,
  };

  const resUser = await User.findById(user._id).select(
    '_id username fullName profilePicture isAdmin securityKey',
  );
  res
    .status(201)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('loggedIn', true, { maxAge: timeRemaining })
    .json(
      new ApiResponse(
        201,
        {
          user: resUser,
        },
        'Logged In',
      ),
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res
    .status(200)
    .clearCookie('accessToken')
    .clearCookie('loggedIn')
    .json(new ApiResponse(200, {}, 'Logged Out'));
});
