const { Contact } = require("../db/schemaDB");

const getAllContactsService = async () => {
  return Contact.find();
};

const getContactByIdService = async (id) => {
  const contact = await Contact.findOne({ _id: id });

  if (!contact) {
    throw new Error(`Failure, no contacts with id '${id}' found!`);
  }

  return contact;
};

const createContactService = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContactService = (id, { name, email, phone, favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { name, email, phone, favorite } },
    { new: true }
  );
};

const removeContactService = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const changeFavoriteStatusService = (id, favorite) => {
  return Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
};

module.exports = {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
};
