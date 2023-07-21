// const { User } = require("../../models/user");

// const { ctrlWraper, UpsErrors } = require("../../Helpers");

// const update = async (req, res, next) => {
//   const { _id, subscription } = req.body;
//   await User.findById(_id);
//   if (!update) {
//     next(UpsErrors(404, "User not found"));
//   }
//   update.subscription = subscription;
//   await User.save(update);
// };
