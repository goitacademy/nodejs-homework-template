const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/users");

async function current(req, res, next) {
    const { _id } = req.user;
  
    const user = await User.findById(_id);
  
    if (!user || !user.token) 
    return next(new HttpError(401, "Not authorized"));
  
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
}

module.exports = {current};