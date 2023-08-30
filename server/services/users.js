import User from "../models/user.js";

const getAll = async () => {
  return User.find().lean();
};

const getOne = async (userId) => {
  return User.findById({ _id: userId }).lean();
};

const update = async (userId, data) => {
  return User.findOneAndUpdate({ _id: userId }, data, {
    runValidators: true,
    new: true,
  });
};

const remove = async (userId) => {
  return User.findOneAndDelete({ _id: userId });
};

const service = {
  getAll,
  getOne,
  update,
  remove,
};

export default service;
