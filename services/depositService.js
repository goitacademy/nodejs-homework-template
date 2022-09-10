const { User } = require("../db/userModel");
const { Deposit } = require("../db/depositModel");

const deposit = async (username, amount, userId) => {
  const refill = new Deposit({
    amount: amount,
    owner: userId,
  });

  const user = await User.findOne({ username: username });
  user.balance += Number(amount);
  user.deposits.push(refill);

  await refill.save();
  await user.save();

  return user;
};
module.exports = {
  deposit,
};
