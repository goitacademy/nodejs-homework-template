const asyncHandler = require('express-async-handler');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const logout = asyncHandler(async (req, res, next) => {
    
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      throw HttpError(401);
    }
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
 });

module.exports = logout;