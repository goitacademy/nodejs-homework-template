const { User } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

//в req.user находится вся информацию о юзере
const logout = async (req, res) => {
  const { _id } = req.user;
  //token: null - разлогинились. обновляем по _id
  await User.findByIdAndUpdate(_id, { token: null });
  sendSuccessResponse(res, null, 200);
//   res.json({
//     status: "success",
//     code: 200,
//     message: "Success logout",
//   });
// };

module.exports = logout;
