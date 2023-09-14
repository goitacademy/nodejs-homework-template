import User from "./models/users.js";

const getUser = async query => {
  try {
    return await User.findOne(query).lean();
  } catch (err) {
    console.error(err.message);
  }
};

const getUserWithOrOperator = async query => {
  try {
    return await User.findOne({ $or: query }).lean();
  } catch (err) {
    console.error(err.message);
  }
};

const createUser = async body => {
  try {
    return new User(body);
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

const updateUser = async (query, body) => {
  try {
    return User.findOneAndUpdate(query, body, {
      runValidators: true,
      new: true,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async query => {
  try {
    await User.findOneAndRemove(query).lean();
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

const service = {
  getUser,
  getUserWithOrOperator,
  createUser,
  updateUser,
  deleteUser,
};

export default service;
