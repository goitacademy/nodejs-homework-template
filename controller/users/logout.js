const service = require("../../model/users");
const { catchAsync } = require("../../utils/errorHandlers");

const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await service.updateToken(_id, "");

  res.status(200).json({
    msg: "Logout sucsess",
  });
});

module.exports = logout;
