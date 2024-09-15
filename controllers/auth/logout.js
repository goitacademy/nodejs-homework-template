const { User } = require("../../models");
const { HttpError } = require("../../utils");

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
   await User.findByIdAndUpdate(
      id,
      { token: null },
      { new: true }
    ).exec();
    
    res.status(204).json();

};
module.exports = logout;
