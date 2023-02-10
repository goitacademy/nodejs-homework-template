const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/users");

async function logout(req, res, next) {
    const { _id } = req.user;
  
    const user = await User.findById(_id);
  
    if (!user || !user.token) 
    return next(new HttpError(401, "Not authorized"));
  
    await User.findByIdAndUpdate(_id, { $set: { token: null } });
  
    return res.status(204).json();
}

module.exports = {logout};