const Payment = require("../models/Payment");
const { StatusCodes } = require("http-status-codes");

const createPayment = async (req, res) => {
  const { id: studentId } = req.query;
  const {
    paymentYear,
    paymentMonth,
    paymentDay,
    amount,
    paymentforMonth,
    paymentforYear,
  } = req.body;
  if (
    !paymentYear ||
    !paymentMonth ||
    !paymentDay ||
    !amount ||
    !paymentforMonth ||
    !paymentforYear
  ) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const payment = await Payment.create({
    student: studentId,
    paymentYear,
    paymentMonth,
    paymentDay,
    amount,
    paymentforMonth,
    paymentforYear,
  });
  res.status(StatusCodes.CREATED).json({ payment });
};

const getAllPaymentsforYear = async (req, res) => {
  const { year } = req.query;
  const payments = await Payment.find({ paymentforYear: year });
  res.status(StatusCodes.OK).json({ payments });
};

const getAllPaymentsforMonth = async (req, res) => {
  const { year, month } = req.query;
  const payments = await Payment.find({
    paymentforMonth: month,
    paymentforYear: year,
  });
  res.status(StatusCodes.OK).json({ payments });
};

const getSinglePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id: ${paymentId}`);
  }
  res.status(StatusCodes.OK).json({ payment });
};

const updatePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const { amount, paymentforMonth, paymentforYear } = req.body;
  if (!amount || !paymentforMonth || !paymentforYear) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    { amount, paymentforMonth, paymentforYear },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ payment });
};

const deletePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOneAndDelete({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id: ${paymentId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Payment deleted" });
};

const getAllPaymentsforStudent = async (req, res) => {
  const { id: studentId } = req.params;
  if (!studentId) {
    throw new CustomError.BadRequestError("Please provide student id");
  }
  const payments = await Payment.find({ student: studentId });
  res.status(StatusCodes.OK).json({ payments });
};

module.exports = {
  createPayment,
  getAllPaymentsforYear,
  getAllPaymentsforMonth,
  getSinglePayment,
  updatePayment,
  deletePayment,
  getAllPaymentsforStudent,
};
