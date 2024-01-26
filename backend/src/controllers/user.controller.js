import mongoose from 'mongoose';
import { Attendance } from '../models/attendance.model.js';
import { Grade } from '../models/grade.model.js';
import { Leave } from '../models/leave.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from '../utils/cloudinary.js';
import { User } from './../models/user.model.js';

import { asyncHandler } from './../utils/asyncHandler.js';
import { generateTodayDates } from './../utils/generateTodayDates.js';

export const userHomePageData = asyncHandler(async (req, res) => {
  const user = req.user;
  //var
  let userTodayAttendance = false;
  let userLeave = false;

  //Getting Today Attendance
  //Setting Today Date
  const { todayStart, todayEnd, currentDate } = generateTodayDates();

  //Getting Attendance
  userTodayAttendance = await Attendance.findOne({
    user: user._id,
    'attendance.date': {
      $gte: todayStart,
      $lte: todayEnd,
    },
  });

  //If leave is submitted
  if (userTodayAttendance?.attendance[0]?.isLeaveSubmitted) {
    const ThisDayLeave = await Leave.findOne({
      user: user._id,
      'leaveHistory.date': {
        $gte: todayStart,
        $lte: todayEnd,
      },
    }).select('leaveHistory');
    const unFormattedDate = new Date(ThisDayLeave?.leaveHistory[0]?.date);
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(
      unFormattedDate,
    );
    const year = unFormattedDate.getFullYear();
    const datePart = unFormattedDate.toISOString().split('T')[0];
    const { status, leaveMessage } = ThisDayLeave.leaveHistory[0];
    userLeave = {
      status: status,
      leaveMessage: leaveMessage,
      month: month,
      year: year,
      date: datePart,
    };
  }

  //if today Attendance found
  if (userTodayAttendance?.attendance[0]?.isPresent) {
    userTodayAttendance = true;
  } else {
    userTodayAttendance = false;
  }

  //finding this months grade:

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userTodayAttendance, userLeave },
        'HomeData Fetched Successfully',
      ),
    );
});

export const userUpdateProfilePicture = asyncHandler(async (req, res) => {
  const profilePictureLocalPath = req.file?.path;

  if (!profilePictureLocalPath) {
    throw new ApiError(400, 'Please upload a profile picture');
  }

  const user = req.user;

  const cloudinaryUrl = await uploadOnCloudinary(profilePictureLocalPath);

  if (!cloudinaryUrl.url) {
    throw new ApiError(
      400,
      'Something went wrong while uploading profile picture',
    );
  }

  if (!user.profilePicture == '') {
    await deleteFromCloudinary(user.profilePicture);
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      profilePicture: cloudinaryUrl.url,
    },
    {
      new: true,
    },
  ).select('fullName username profilePicture securityKey isAdmin');

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: updatedUser,
      },
      'Profile Picture Updated Successfully',
    ),
  );
});

export const userUpdateDetails = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { username, securityKey, fullName } = req?.body;
  if (!username || !securityKey || !fullName) {
    throw new ApiError(400, 'All Fields are required');
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      username: username,
      fullName: fullName,
      securitykey: securityKey,
    },
    { new: true },
  );

  if (!updatedUser) {
    throw new ApiError(500, 'Something went wrong while updating');
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, { user: updatedUser }, 'User updated Successfully'),
    );
});

export const userUpdatePassword = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { password } = req?.body;

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  user.password = password;
  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ApiError(500, 'Something went wrong while updating password');
  }

  res.status(201).json(new ApiResponse(201, 'password Successfully Changed'));
});

export const userMarkAttendance = asyncHandler(async (req, res) => {
  const user = req.user;

  // Checking if user is already marked for today If yes then Cancel the request
  const userAttendanceToday = await Attendance.findOne({
    user: user._id,
    'attendance.date': {
      $gte: new Date(new Date().setHours(0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59)),
    },
  });

  //If user is already marked for today
  if (userAttendanceToday) {
    throw new ApiError(400, 'Attendance already marked for today');
  }

  //If user is not marked for today
  const { currentDate } = generateTodayDates();
  const attendance = await Attendance.findOneAndUpdate(
    {
      user: user._id,
    },
    {
      $push: {
        attendance: {
          date: currentDate,
          isPresent: true,
          isLeaveSubmitted: false,
        },
      },
    },
    {
      new: true,
    },
  );

  if (!attendance) {
    throw new ApiError(400, 'Something went wrong while marking attendance');
  }

  res.status(201).json(
    new ApiResponse(200, 'Attendance marked successfully', {
      attendance,
    }),
  );
});

export const userMarkLeave = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { leaveMessage } = req?.body;

  if (!leaveMessage) {
    throw new ApiError(400, 'Leave Message is required');
  }

  //If the exisitng leave exists then cancel the request
  const existingLeave = await Leave.findOne({
    user: user._id,
    'leaveHistory.date': {
      $gte: new Date(new Date().setHours(0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59)),
    },
  });

  if (existingLeave) {
    throw new ApiError(400, 'Leave Already Marked');
  }

  //Adding Leave
  const { currentDate } = generateTodayDates();
  const markLeave = await Leave.findOneAndUpdate(
    { user: user._id },
    {
      $push: {
        leaveHistory: {
          leaveMessage: leaveMessage,
          date: currentDate,
        },
      },
    },
    { new: true },
  );

  if (!markLeave) {
    throw new ApiError(500, 'Something went wrong while updating leave');
  }

  const markAttendance = await Attendance.findOneAndUpdate(
    { user: user._id },
    {
      $push: {
        attendance: {
          isPresent: false,
          isLeaveSubmitted: true,
        },
      },
    },
    { new: true },
  );
  if (!markAttendance) {
    throw new ApiError(400, 'Something went wrong while updating Attendance');
  }

  res
    .status(201)
    .json(new ApiResponse(200, {}, 'Leave Submitted Successfully'));
});

export const userGetAttendance = asyncHandler(async (req, res) => {
  const user = req?.user;

  const { attendance: userAttendence } = await Attendance.findOne({
    user: user._id,
  }).select('attendance -_id');

  const { leaveHistory: userLeaveHistory } = await Leave.findOne({
    user: user._id,
  }).select('-_id leaveHistory');

  //Formating Documents as needed
  //for the days where user is onLeave, merging the object of leave and attendance
  const resultArray = [];
  userAttendence.forEach(obj1 => {
    userLeaveHistory.forEach(obj2 => {
      obj1 = obj1.toObject();
      obj2 = obj2.toObject();
      const date1 = obj1.date instanceof Date ? obj1.date : new Date(obj1.date);
      const date2 = obj2.date instanceof Date ? obj2.date : new Date(obj2.date);

      if (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      ) {
        const dateOnly = date1.toISOString().split('T')[0];
        const arrangedObject = {
          date: dateOnly,
          isPresent: obj1.isPresent,
          isLeaveSubmitted: obj1.isLeaveSubmitted,
          leaveStatus: obj2.status,
        };
        resultArray.push(arrangedObject);
      } else {
        const dateOnly = date1.toISOString().split('T')[0];

        const arrangedObject = {
          date: dateOnly,
          isPresent: obj1.isPresent,
          isLeaveSubmitted: obj1.isLeaveSubmitted,
        };
        resultArray.push(arrangedObject);
      }
    });
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userAttendance: resultArray },
        'User Attendance Fetched Successfully',
      ),
    );
});
