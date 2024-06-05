const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");
const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  const students = await Student.find({});
  res.status(StatusCodes.OK).json({ students });
};

const getSingleStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const createStudent = async (req, res) => {
  req.body.user = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

const updateStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedStudent) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student: updatedStudent });
};

const deleteStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findOneAndDelete({ _id: studentId });
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Student deleted" });
};

const uploadPicture = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "attendance",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.url } });
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadPicture,
};
