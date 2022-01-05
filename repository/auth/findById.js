import User from "../../model/usersSchema";

const findById = async (id) => {
  return await User.findById(id);
};

export default findById;
