const { Deposit } = require("../db/depositModel");
const { User } = require("../db/userModel");
const { rollback } = require("../services/rollbackService");

const rollbackController = async (req, res) => {
  const { deposit_id } = req.body;
  const { _id: userId } = req.user;

  if (!(await Deposit.findOne({ deposit_id: deposit_id }))) {
    return res.status(400).json({
      message: "unknown",
      description: "Not successful, invalid deposit",
    });
  }
  if (!(await User.findOne({ _id: userId }))) {
    return res.status(400).json({
      message: "error",
      description: "Not successful, unknown error",
    });
  }

  const deposit = await rollback(deposit_id, userId);

  res.json({
    deposit: deposit,
    message: "success",
    description: "success",
  });
};

module.exports = {
  rollbackController,
};
