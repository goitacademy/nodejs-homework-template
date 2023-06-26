const { User } = require("../../models");


const logout = async (req, res, next) => {

  const {_id}=req.user;
  await User.findByIdAndUpdate(_id ,{token: ""});
  res.json({
   message: "Status:204 No Content"})
};

module.exports = logout;