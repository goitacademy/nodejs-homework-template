import Users from "../service/schemas/users.js";

export const listUsers = async () => {
  try {
    return await Users.find();
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = (UserId) => {
  return Users.findOne({ _id: UserId });
};

export const addUser = async (body) => {
  const { email, password } = body;
  const users = await Users.find();
  const isUserExist = users.find((user) => user.email === email);
  if (isUserExist) return 409;
  return Users.create(body);
};

export const updateUser = (UserId, body) => {
  return Users.findByIdAndUpdate({ _id: UserId }, body, {
    new: true,
  });
};

export const updateStatus = (UserId, body) => {
  return Users.findByIdAndUpdate(
    { _id: UserId },
    { $set: { favorite: true } },
    {
      new: true,
    }
  );
};
