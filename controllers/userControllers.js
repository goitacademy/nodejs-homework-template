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
  try {
    const user = await User.findById();
    if (!user) {
      return res.status(404).json({ msg: "is not valid" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getCurrent = (req, res) => {
  console.log("we try");

  try {
    res.status(200).json({ msg: "isCurrent", user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
