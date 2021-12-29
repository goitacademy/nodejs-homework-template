import User from "../../model/user";

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export default findByEmail;
