const Contact = require("../models/contact.model");

const getAll = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;

  return Contact.find().skip(startIndex).limit(limit);
};

const getOne = async (id) => {
  return Contact.findById(id);
};

const create = async (body) => {
  return Contact.create(body);
};

const update = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
};

const remove = async (id) => {
  return Contact.findByIdAndRemove(id);
};

const updateStatusContact = async (id, favorite) => {
  return Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
};
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateStatusContact,
};
