const { Contact } = require("../db/ContactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContactsList = async (params, pagination) => {
  // console.log("pagination", pagination);
  // console.log("params", params);
  const contactsList = await Contact.find(params, "", pagination).populate(
    "owner",
    "name email"
  );
  // const contactsList = await Contact.find({}, "-name -phone");
  // const contactsList = await Contact.find({}, "name phone");
  return contactsList;
};

const contactById = async (id, owner) => {
  // const contact = await Contact.findOne({ _id: id }, "name phone");
  const contact = await Contact.findById(id, owner).populate(
    "owner",
    "name email"
  );
  if (contact === null) {
    throw new WrongParametersError(`Contact with id:${id} not found`);
    // return res.status(404).json({ message: "Not found" });
  }
  return contact;
};
const addNewContact = async ({ name, email, phone, favorite, owner }) => {
  console.log("OWNER", owner);
  const contact = new Contact({ name, email, phone, favorite, owner });
  const result = await contact.save();
  return result;
};
const deleteContact = async (id, owner) => {
  const contactRemovedById = await Contact.findByIdAndRemove(id, owner);
  if (contactRemovedById === null) {
    // return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactRemovedById;
};
const contactUpdate = async (id, { name, email, phone, favorite }) => {
  const contactUpdated = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { name, email, phone, favorite },
    },
    { new: true }
  );
  if (contactUpdated === null) {
    //   return res.status(404).json({ message: "Not found" });
    throw new WrongParametersError(`Contact with id:${id} not found`);
  }
  return contactUpdated;
};
const changeContact = async (id, body) => {
  // const bodyKeys = Object.keys(body);
  const { name, email, phone, favorite } = body;
  if (body === {}) {
    throw new WrongParametersError(`"missing fields"`);
  }
  const contactUpdated = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { name, email, phone, favorite },
    },
    { new: true }
  );
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

  const contactUpdated = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );
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
