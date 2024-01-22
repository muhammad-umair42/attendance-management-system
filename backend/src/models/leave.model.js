import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leaveHistory: [
      {
        date: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: false,
          required: true,
          trim: true,
        },
        leaveMessage: {
          type: String,
          default: '',
          trim: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export const Leave = mongoose.model('Leave', leaveSchema);
