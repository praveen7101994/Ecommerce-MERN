import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth user and get token
// @route   GET /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// @desc    Register user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc    get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    get users by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  res.send("get users by id");
});

// @desc    delete users
// @route   DELETE /api/users
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete users");
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
};
