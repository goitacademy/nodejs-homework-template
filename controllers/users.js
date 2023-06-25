const catchAsync = require('../utils/catchAsync');
const {User} = require('../models/userModel');

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
exports.getUserById = (req, res) => {
  const { user } = req;
  res.status(200).json({
    user,
  });
};

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