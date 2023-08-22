const asyncHandler = require("express-async-handler");
const { userValidator } = require("../../utils/validation/validator");
const userModel = require("../../models/userModel");

const updateSubscription = asyncHandler(async (req, res) => {
  const { error } = userValidator(req.body);
  if (error){
    res.status(400);
    throw new Error(error.details[0].message);
  }
  
  const { subscription } = req.body;
  const { userId } = req.params;
  if (!subscription) {
    res.status(400);
    throw new Error("Missing field subscription");
  }

  const user = await userModel.updateUserSubscription(userId, subscription);
  if (!user) {
    res.status(404);
    throw new Error("Not found");    
  }
  
  res.status(200).json({ code: 200, data: user });
});

module.exports = { updateSubscription };
