const { User } = require("../../db/userModel");
const { RequestError } = require("../../helpers/requestError");

const currentUserService = async (id) => {
  const data = await User.findById(id);

  if (!data) {
    throw RequestError(401, "Not authorized");
  }

  const answer = {
    email: data.email,
    subscription: data.subscription,
  };
  return answer;
};
module.exports = { currentUserService };
