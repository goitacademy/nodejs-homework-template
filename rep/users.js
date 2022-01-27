import User from '../model/user';

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateUserSubscription = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true },
  );
};

const updateToken = async (id, token) => {
  return await User.findOneAndUpdate({ _id: id }, { token });
};

const findById = async id => {
  return await User.findById(id);
};

export default {
  findByEmail,
  create,
  updateToken,
  findById,
  updateUserSubscription,
};