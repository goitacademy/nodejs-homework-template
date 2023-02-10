const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/users");

async function updateSubscription(req, res, next) {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findById(_id);
  
    if (!user || !user.token) 
    return next(new HttpError(401, "Not authorized"));
  
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription: subscription },
      { new: true }
    );
  
    res.json({
      email: user.email,
      subscription: updatedUser.subscription,
    });
}

module.exports = {updateSubscription};