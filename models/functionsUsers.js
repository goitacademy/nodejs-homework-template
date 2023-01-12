const User = require("./users");

const findById = async (id) => {
    return await User.findById(id)
}

const findOne = async (email) => {
  return await User.findOne({ email });
};

const create = async (body) => {
  return await User.create(body);
};

const findOneAndUpdate = async (obj1, obj2) => {
  return await User.findOneAndUpdate(obj1, obj2, {new: true});
};

module.exports = {
  findOne,
  create,
  findOneAndUpdate,
  findById,
};
