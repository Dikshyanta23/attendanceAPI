const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
      required: true,
    },
    paymentYear: {
      type: Number,
      required: true,
    },
    paymentMonth: {
      type: Number,
      required: true,
    },
    paymentDay: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    paymentforMonth: {
      type: String,
      required: [true, "Please provide month for payment"],
    },
    paymentforYear: {
      type: Number,
      required: [true, "Please provide year for payment"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
