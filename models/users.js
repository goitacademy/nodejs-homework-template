import User from "../service/schemas/users.js";

export const listUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (body) => {
  const { email, password } = body;
  const users = await User.find();
  const user = users.find((user) => user.email === email);
  if (!user) return false;
  try {
    const isUser = user.validPassword(password, user.password);
    if (!isUser) return false;
    return user;
  } catch (err) {
    console.log("Error adding new user: ", err);
    throw err;
  }
};

export const updateUser = (UserId, body) => {
  return User.findByIdAndUpdate({ _id: UserId }, body, {
    new: true,
  });
};

export const updateStatus = (UserId, body) => {
  return User.findByIdAndUpdate(
    { _id: UserId },
    { $set: { favorite: true } },
    {
      new: true,
    }
  );
};
