import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from './../models/user.model.js';
import { asyncHandler } from './../utils/asyncHandler.js';

export const isUserAuthenticated = asyncHandler(async (req, res, next) => {
  const userId = req?.params?.id;
  const accessToken = req?.cookies?.accessToken;
  if (!accessToken) {
    return next(new ApiError(401, 'Please login to start your session'));
  }
  if (!userId) {
    return next(new ApiError(401, 'Please provide user id'));
  }
  // Verify user access limits
  const decoded = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
  );
  if (!decoded || decoded._id !== userId) {
    return next(new ApiError(401, 'user access denied,UnMatched credentials'));
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError(401, 'User not found'));
  }

  req.user = user;
  next();
});
