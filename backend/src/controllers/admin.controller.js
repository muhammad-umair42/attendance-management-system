import { Attendance } from '../models/attendance.model.js';
import { Leave } from '../models/leave.model.js';
import { LoginHistory } from '../models/loginHistory.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { SystemReport } from './../models/systemReport.model.js';
import {
  generateFormatedDate,
  generateTodayDates,
} from './../utils/generateTodayDates.js';

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const { todayStart } = generateTodayDates();
  const loginHistory = await LoginHistory.findOne({ date: todayStart })
    .populate({
      path: 'history.user',
      model: 'User',
      select: 'fullName username date -_id',
    })
    .sort({ createdAt: -1 });

  const resultArr = [];
  await loginHistory.toObject().history.forEach(entry => {
    // Convert the existing time string to a Luxon DateTime object
    const { formatedTime } = generateFormatedDate(entry.time);
    console.log(entry.time, formatedTime);
    // Update the time property with the new time
    resultArr.push({ ...entry, time: formatedTime });
  });
  console.log(resultArr);

  res
    .status(200)
    .json(new ApiResponse(200, { loginHistory: resultArr }, 'success'));
});
export const getAttendances = asyncHandler(async (req, res) => {
  const Attendances = await User.find({ isAdmin: false }).select(
    '_id fullName username createdAt ',
  );

  if (!Attendances) {
    throw new ApiError(400, 'Something went wrong while getting all users');
  }

  res
    .status(200)
    .json(new ApiResponse(200, { Attendances }, 'Users fetched successfully'));
});

export const getUserAttendance = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  const { monthEnd, monthStart } = generateTodayDates();
  const userAttendance = await Attendance.findOne({
    user: id,
    'attendance.date': {
      $gte: monthStart,
      $lte: monthEnd,
    },
  }).populate('user');
  if (userAttendance) {
    const result = {
      user: userAttendance.user,
      attendance: [],
    };
    userAttendance.toObject().attendance.forEach(attendance => {
      const { formatedDate, formatedTime } = generateFormatedDate(
        attendance.date,
      );
      result.attendance.push({
        ...attendance,
        date: formatedDate,
        time: formatedTime,
      });
    });
    res
      .status(200)
      .json(new ApiResponse(200, { userAttendance: result }, 'success'));
  }

  res.status(200).json(new ApiResponse(200, {}, 'success'));
});

export const deleteUserAttendance = asyncHandler(async (req, res) => {
  const { attendanceid } = req.body;
  const userID = req.params.id;

  const newAttendance = await Attendance.findOneAndUpdate(
    { user: userID },
    { $pull: { attendance: { _id: attendanceid } } },
    { new: true },
  );

  if (!newAttendance) {
    throw new ApiError(
      400,
      'Something went wrong while deleting the attendance',
    );
  }

  res.status(200).json(new ApiResponse(200, {}, 'success'));
});

export const createUserAttendance = asyncHandler(async (req, res) => {
  const { ReqDate } = req.body;
  const userID = req.params.id;

  if (!ReqDate) {
    throw new ApiError(400, 'Please provide a date');
  }

  const newAttendance = await Attendance.findOneAndUpdate(
    { user: userID },
    {
      $push: {
        attendance: { date: ReqDate, isPresent: true, isLeaveSubmitted: false },
      },
    },
    { new: true },
  );

  if (!newAttendance) {
    throw new ApiError(
      400,
      'Something went wrong while deleting the attendance',
    );
  }

  res.status(200).json(new ApiResponse(200, {}, 'success'));
});

export const getAllLeaves = asyncHandler(async (req, res) => {
  console.log('here');
  const leaves = await Leave.find({
    'leaveHistory.status': 'pending',
  }).populate('user');

  if (leaves.length > 0) {
    const updatedDataArray = [];

    for (const data of leaves) {
      const updatedLeaveHistory = data.leaveHistory.map(leave => {
        const { formatedDate } = generateFormatedDate(leave.date);
        // Update the date to a new value (e.g., the current date)
        return { ...leave.toObject(), date: formatedDate };
      });

      const updatedData = {
        ...data.toObject(),
        leaveHistory: updatedLeaveHistory,
      };
      updatedDataArray.push(updatedData);
    }

    console.log(updatedDataArray);
    res
      .status(200)
      .json(new ApiResponse(200, { leaves: updatedDataArray }, 'success'));
  }

  res.status(200).json(new ApiResponse(200, { leaves }, 'success'));
});

export const changeLeaveStatus = asyncHandler(async (req, res) => {
  const { leaveId, status } = req.body;
  const leave = await Leave.findOneAndUpdate(
    { user: req.params.id, 'leaveHistory._id': leaveId },
    { $set: { 'leaveHistory.$.status': status } },
    { new: true },
  );

  res.status(200).json(new ApiResponse(200, { leave }, 'success'));
});

export const createReport = asyncHandler(async (req, res) => {
  const { from, to, message } = req.body;

  const fFrom = new Date(from);
  const fTo = new Date(to);

  const users = await Attendance.find({
    'attendance.date': {
      $gte: fFrom,
      $lte: fTo,
    },
  }).select('user -_id');

  const report = await SystemReport.create({
    from: fFrom,
    to: fTo,
    report: message,
    users: users.map(user => user.user.toString()),
  });

  res.status(200).json(new ApiResponse(200, {}, 'success'));
});

export const getReports = asyncHandler(async (req, res) => {
  const reports = await SystemReport.find({})
    .populate({
      path: 'users',
      select: 'fullName', // specify the fields you want to select from the User model
    })
    .select('from to report ');

  console.log(reports);
  if (!reports) {
    throw new ApiError(400, 'Something went wrong while getting all reports');
  }

  res.status(200).json(new ApiResponse(200, { reports }, 'success'));
});
