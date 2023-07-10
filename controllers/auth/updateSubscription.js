// const { User } = require('../../models/user');

// const { HttpError, ctrlWrapper } = require('../../helpers');

// const updateSubscription = async (req, res, next) => {
//   const { _id } = req.user;
//   const updatedUser = await User.findByIdAndUpdate(
//     _id,
//     {
//       subscription: req.body,
//     },
//     { new: true }
//   );
//   if (!updatedUser) {
//     throw HttpError(404, 'User not found');
//   }
//   res.json(updatedUser);
// };

// module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
