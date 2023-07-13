const { Types } = require('mongoose');
const uuid = require('uuid').v4;
const multer = require('multer');
const {User} = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { createUserDataValidator, updateUserDataValidator, newPassValidator } = require('../utils/userValidators');
const ImageService = require('../services/imageService');

const checkUserById = catchAsync(async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) return next(new AppError(400, 'Bad request..'));

  const user = await User.findById(id);

  if (!user) return next(new AppError(404, 'User does not exist..'));

  req.user = user;

  next();
});

const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  if (error) return next(new AppError(400, 'Invalid user data..'));

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, 'User with this email already exists..'));

  req.body = value;

  next();
});

const checkUpdateUserData = catchAsync(async (req, res, next) => {
  const { error, value } = updateUserDataValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid user data..'));

  const userExists = await User.findOne({ email: value.email });

  const userIsTheSame = req.user.id === userExists.id;

  if (userExists && !userIsTheSame) return next(new AppError(409, 'User with this email already exists..'));

  req.body = value;

  next();
});

const uploadUserAvatar = ImageService.upload('avatarUrl');

const checkMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  // if (error) return next(new AppError(400, 'Invalid user data..'));

  const user = await User.findById(req.user.id).select('password');
  
  if (!(await user.checkPassword(currentPassword, user.password))) {
    throw new AppError(401, 'Current password wrong...');
  }
  user.password = newPassword;
  
  await user.save();

  next();
  
})

module.exports = {
  checkUserById,
  checkCreateUserData,    
  checkUpdateUserData,
  checkMyPassword,
  uploadUserAvatar,
}