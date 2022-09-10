const { Deposit } = require("../db/depositModel");

const rollback = async (deposit_id, userId) => {
  const deposit = await Deposit.findOne({
    deposit_id: deposit_id,
    owner: userId,
  }).select({
    __v: 0,
    _id: 0,
  });
  return deposit;
};
module.exports = {
  rollback,
};
