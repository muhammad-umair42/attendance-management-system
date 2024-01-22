import mongoose from 'mongoose';

const systemReportSchema = new mongoose.Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const SystemReport = mongoose.model('SystemReport', systemReportSchema);
