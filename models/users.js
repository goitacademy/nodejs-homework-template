const User = require("../service/schemas/users");

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.log("Error getting user list: ", err);
    throw err;
  }
};

module.exports = {
  getUser,
};
