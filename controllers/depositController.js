const { deposit } = require("../services/depositService");
const { User } = require("../db/userModel");
const { ObjectId } = require("mongodb");

const depositController = async (req, res) => {
  const { username, amount } = req.body;
  const { _id: userId } = req.user;
  const findUser = await User.findOne({ username: username, _id: userId });
  if (!findUser) {
    return res.status(401).json({
      message: "error",
      description: `Not successful, you can only take a deposit in your name`,
    });
  }

  const user = await deposit(username, amount, userId);

  res.json({
    deposit_id: user.deposits[user.deposits.length - 1]._id,
    balance: user.balance,
    message: "success",
    description: "success",
  });
};
module.exports = {
  depositController,
};

//username должен совпадать с user_id токена
