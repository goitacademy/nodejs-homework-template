import Contact from "../models/contact.model.js";

const getAll = async (query) => {
  return Contact.find(query);
};

const getOne = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = async (data) => {
  return Contact.create(data);
};

const update = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
};

const remove = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

export default {
  getAll,
  getOne,
  create,
  update,
  updateFavorite,
  remove,
};
