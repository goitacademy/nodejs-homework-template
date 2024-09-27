const { ctrlWrapper, HttpError } = require("../helpers");
// імпортую модель
const { User } = require("../models/user");
const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

//   if (!["starter", "pro", "business"].includes(subscription)) {
//     throw HttpError(404, "Invalid subscription value");
//   }
  const result = await User.findByIdAndUpdate( id , {subscription}, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json( result );
};

module.exports = {
 
  updateSubscription: ctrlWrapper(updateSubscription),
};