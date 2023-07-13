const catchAsync = require('../utils/catchAsync');
const {User} = require('../models/userModel');
const { response } = require('../app');
const ImageService = require('../services/imageService');

/**
 * Create user
 */
exports.createUser = catchAsync(async (req, res) => {
 
  const newUser = await User.create({
    ...req.body,
  });
    
  newUser.password = undefined;

  res.status(201).json({
    user: newUser,
  });
});

/**
 * Get users list
 */
exports.getUsersList = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

/**
 * Get user by id
 */
exports.getUserById = catchAsync(async (req, res) => {
  console.log(req)
  const { user } = req;
  res.status(200).json({
    user,
  });
});

/**
 * Update user by id
 */
exports.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      year: req.body.year,
      email: req.body.email,
      subscription: req.body.subscription
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    user: updatedUser,
  });
});

/**
 * Delete user by id
 */
exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.sendStatus(204);
});

exports.getMe = (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription
  })
}

exports.updateMe = catchAsync(async (req, res) => { 
  const { user, file } = req;
  console.log(user)
    const { _id } = req.user;

  if (file) {
user.avatarUrl = await ImageService.save(file, {width: 250, height: 250}, 'public', 'avatars', _id )
  }

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key];
  });
  const updatedUser = await user.save();

  res.status(200).json({
    user: updatedUser,
  })
})

exports.updateMyPassword = (req, res) => {
  res.status(200).json({
    user: req.user,
  })
}