const { Contact } = require("../db/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (owner, { skip, limit, favorite }) => {   
  // console.log(owner);
  if (favorite) {
    const contacts = await Contact.find({owner, favorite })
      .select({ __v: 0 }).skip(skip).limit(limit);  
    return contacts;
  }
  const contacts = await Contact.find({owner })
    .select({ __v: 0 }).skip(skip).limit(limit);  
  return contacts;
};

const getContactById = async (id, userId) => {
  console.log(id, userId);
  const contact = await Contact.findOne({_id: id, owner: userId});
  if (!contact) {
    throw new WrongParametersError(`Not found such id ${id}`);
  }
  return contact;
};

const addContact = async ({ name, phone, email, favorite }, userId) => {
  const contact = new Contact({ name, phone, email, favorite, owner: userId });
  await contact.save();
  return contact;
};
const deleteContactById = async (id, userId) => {
  const contact = await Contact.findOneAndRemove({_id: id, owner: userId});
  if (!contact) {
    throw new WrongParametersError(`Not found such id ${id}`);
  }
};
const putContactById = async (id, { name, email, phone }, userId) => {
  await Contact.findOneAndUpdate({_id: id, owner: userId}, { $set: { name, email, phone } });
};
const updateStatusContactById = async (id, { favorite }, userId) => {
  const contact = await Contact.findOneAndUpdate(
    {_id: id, owner: userId},
    { $set: { favorite } },
    { new: true }
  );
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  putContactById,
  updateStatusContactById,
};
