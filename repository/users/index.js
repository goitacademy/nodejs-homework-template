import User from "../../model/user";

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const createNewUser = async (body) => {
  const user = await new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

export default { findById, findByEmail, createNewUser, updateToken };
