import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        isPresent: {
          type: Boolean,
          default: false,
          required: true,
        },
        isLeaveSubmitted: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export const Attendance = mongoose.model('Attendance', AttendanceSchema);
