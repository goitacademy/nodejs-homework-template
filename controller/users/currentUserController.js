const {
  currentUserService,
} = require("../../servises/users/currentUserService");

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const data = await currentUserService(_id);
  res.status(200).json(data);
};

module.exports = {
  currentUserController,
};
