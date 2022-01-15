import User from "../../model/usersSchema";

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

export default updateAvatar;
