const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const { attachCookiesToResponse, createToken } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new customError.BadRequestError("Email already exists");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const tokenUser = createToken(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new customError.UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = createToken(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
