import User from "../../model/usersSchema";

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

export default create;
