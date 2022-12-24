const { Contact } = require("../db/PostModel");
const { WrongParametersError } = require("../helpers/errors");

const getContactsList = async () => {
  const contactsList = await Contact.find({});
  return contactsList;
};

const contactById = async (id) => {
  const contact = await Contact.findById(id);
  if (contact === null) {
    throw new WrongParametersError(`Contact with id:${id} not found`);
    // return res.status(404).json({ message: "Not found" });
  }
  return contact;
};
const addNewContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  const result = await contact.save();
  return result;
};
const deleteContact = async (id) => {
  const contactRemovedById = await Contact.findByIdAndRemove(id);
  if (contactRemovedById === null) {
    // return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactRemovedById;
};
const contactUpdate = async (id, { name, email, phone, favorite }) => {
  const contactUpdated = await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
  if (contactUpdated === null) {
    //   return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactUpdated;
};
const changeContact = async (id, body) => {
  // const bodyKeys = Object.keys(body);
  if (body === {}) {
    throw new WrongParametersError(`"missing fields"`);
  }
  const contactUpdated = await Contact.findByIdAndUpdate(id, {
    $set: { ...body },
  });
  if (contactUpdated === null) {
    //   return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactUpdated;
};

const updateStatusContact = async (id, body) => {
  if (body === {} || body === null) {
    throw new WrongParametersError(`"missing field favorite"`);
  }
  const { favorite } = body;

  const contactUpdated = await Contact.findByIdAndUpdate(id, {
    $set: { favorite },
  });
  if (contactUpdated === null) {
    //   return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactUpdated;
};
module.exports = {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
  updateStatusContact,
};
