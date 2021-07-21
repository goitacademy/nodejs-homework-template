const { Contact } = require('../model');

const getAll = () => {
  return Contact.find({})
}

const getById = async (id) => {
  try {
    const result = await Contact.findById(id);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return null;
    };
    throw error;
  }
};

const add = (newContact) => {
  return Contact.create(newContact);
}

const update = (id, updateContact) => {
  return Contact.findByIdAndUpdate(id, updateContact);
}

module.exports = {
  add,
  getAll,
  getById,
  update,
}
