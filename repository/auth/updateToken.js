import User from "../../model/usersSchema";

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

export default updateToken;
