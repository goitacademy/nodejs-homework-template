const User = require("../model/userModel");

exports.createUser = async (req, res, next) => {
  const createUser = await User.create(req.body);
  console.log(createUser);

  res.status(200).json({ msg: "success", createUser });
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { password, email } = req.body;
  const updateUser = await User.findByIdAndUpdate(id, {
    password,
    email,
  });
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.sendStatus(204);
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find(req.params.id);
  if (!users) res.status(404).json({ msg: "is not valid" });
  res.status(200).json(users);
};

exports.getUserId = async (req, res, next) => {
  const user = await User.findById();
  if (!user) res.status(404).json({ msg: "is not valid" });
  res.status(200).json(user);
};
