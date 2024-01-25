import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Attendance } from './attendance.model.js';
import { Grade } from './grade.model.js';
import { Leave } from './leave.model.js';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: '',
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    securityKey: {
      type: String,
      required: true,
      trim: true,
    },
    //Other Models linked to User
    attendanceHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance',
    },
    leaveHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Leave',
    },
    gradeHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade',
    },
  },
  { timestamps: true },
);

//Hashing password before the user is saved
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//creating all the Documents Linked to the User
userSchema.pre('save', async function (next) {
  //Attendance
  if (!this.attendanceHistory) {
    const attendance = await Attendance.create({ user: this._id });
    this.attendanceHistory = attendance._id;
  }

  //Leave
  if (!this.leaveHistory) {
    const leave = await Leave.create({ user: this._id });
    this.leaveHistory = leave._id;
  }

  //Grade
  if (!this.gradeHistory) {
    const grade = await Grade.create({ user: this._id });
    this.gradeHistory = grade._id;
  }

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model('User', userSchema);
