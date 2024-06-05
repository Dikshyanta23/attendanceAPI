const Absentees = require("../models/Absentees");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createAbsentees = async (req, res) => {
  const { id: studentId } = req.query;
  const { dateYear, dateMonth, dateDay, reason } = req.body;
  if (!dateYear || !dateMonth || !dateDay || !reason) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const absentees = await Absentees.create({
    student: studentId,
    dateYear,
    dateMonth,
    dateDay,
    reason,
  });
  res.status(StatusCodes.CREATED).json({ absentees });
};

const getAllAbsentees = async (req, res) => {
  const absentees = await Absentees.find({});
  res.status(StatusCodes.OK).json({ absentees });
};

const getSingleAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const absentee = await Absentees.findOne({ _id: absenteesId });
  if (!absentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ absentee });
};

const getAllAbsenteesByDate = async (req, res) => {
  const { dateYear, dateMonth, dateDay } = req.body;
  const absentees = await Absentees.find({ dateYear, dateMonth, dateDay });
  res.status(StatusCodes.OK).json({ absentees });
};

const getAllAbsenteesByStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const absentees = await Absentees.find({ student: studentId });
  res.status(StatusCodes.OK).json({ absentees });
};

const updateAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const { date, reason } = req.body;
  const updatedAbsentee = await Absentees.findOneAndUpdate(
    { _id: absenteesId },
    { date, reason },
    { new: true, runValidators: true }
  );
  if (!updatedAbsentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ absentee: updatedAbsentee });
};

const deleteAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const absentee = await Absentees.findOneAndDelete({ _id: absenteesId });
  if (!absentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Absentee deleted" });
};

module.exports = {
  createAbsentees,
  getAllAbsentees,
  getAllAbsenteesByDate,
  getAllAbsenteesByStudent,
  updateAbsentees,
  deleteAbsentees,
  getSingleAbsentees,
};
