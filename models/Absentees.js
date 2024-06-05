const mongoose = require("mongoose");

const absentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
      required: true,
    },
    dateYear: {
      type: Number,
      required: true,
    },
    dateMonth: {
      type: Number,
      required: true,
    },
    dateDay: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: [true, "Please provide reason"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Absentees", absentSchema);
