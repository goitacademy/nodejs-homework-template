const Contact = require("../models/contacts.model");

const getAll = async () => {
  return Contact.find();
};

const getById = async (id) => {
  return Contact.findOne({ _id: id });
};

const create = async (data) => {
  return Contact.create(data);
};

const update = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const updateFavorite = async (id, favorite) => {
  return Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
};

const remove = (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
