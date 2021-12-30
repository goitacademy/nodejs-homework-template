import User from "../../model/user";

const createUser = async (body) => {
  const user = new User(body);
  console.log(user);
  return await user.save();
};

export default createUser;
