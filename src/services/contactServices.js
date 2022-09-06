const { ContactModel } = require("../bd/Cshema");
const { WrongParamsError } = require("../helpers/errors");

const listContacts = async (owner, query) => {
  const contacts = await ContactModel.find({ owner, ...query });
  return contacts;
};

const getContactById = async (_id, owner) => {
  const dataId = await ContactModel.findById({ _id, owner: owner.toString() });

  if (!dataId) {
    throw new WrongParamsError(`failure, this is not contact ${_id}`);
  }
  return dataId;
};

const addContact = async (body, owner) => {
  try {
    const contact = new ContactModel({ ...body, owner });
    await contact.save();
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (_id, owner) => {
  return await ContactModel.deleteOne({ _id, owner });
};

const updateContact = async (_id, { name, email, phone, favorite }, owner) => {
  return await ContactModel.findByIdAndUpdate(
    { _id, owner },
    { name, email, phone, favorite }
  );
};

const updateStatusContact = async (
  _id,
  { name, email, phone, favorite },
  owner
) => {
  return await ContactModel.findByIdAndUpdate(
    { _id, owner },
    { name, email, phone, favorite }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
