const { Contact } = require("../db/contactsModel");
const { WrongParamsError } = require("../helpers/errors");

const getContacts = async () => {
  return await Contact.find({});
};

const getContactsById = async (id) => {
  const dataId = await Contact.findOne({ id });

  if (!dataId) {
    throw new WrongParamsError(`failure, this is not contact ${id}`);
  }
  return dataId;
};

const getAddContacts = async (body) => {
  return await Contact.create(body);
};

const getDeleteContacts = async (id) => {
  return await Contact.deleteOne({ id });
};

const getUpdateContacts = async (id, { name, email, phone, favorite }) => {
  return await Contact.findByIdAndUpdate(
    { id },
    { name, email, phone, favorite }
  );
};

const getUpdateStatusContacts = async (
  id,
  { name, email, phone, favorite }
) => {
  return await Contact.findByIdAndUpdate(
    { id },
    { name, email, phone, favorite }
  );
};

module.exports = {
  getContacts,
  getContactsById,
  getAddContacts,
  getDeleteContacts,
  getUpdateContacts,
  getUpdateStatusContacts,
};
