import User from "../../model/usersSchema";

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export default findByEmail;
