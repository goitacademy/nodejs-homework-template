const { Contact } = require("../../models/index");

const getAllContactsService = async (userId, page, limit, favorite) => {
  const contacts = await Contact.find(
    favorite ? { owner: userId, favorite: favorite } : { owner: userId }
  )
    .skip((page - 1) * limit)
    .limit(limit);
  return contacts;
};

const getContactByIdService = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, owner: userId });

  if (!contact) {
    throw new Error(`Failure, no contacts with id '${id}' found!`);
  }

  return contact;
};

const createContactService = ({ name, email, phone, favorite }, userId) => {
  return Contact.create({ name, email, phone, favorite, owner: userId });
};

const updateContactService = (id, { name, email, phone, favorite }, userId) => {
  return Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { $set: { name, email, phone, favorite } },
    { new: true }
  );
};

const removeContactService = (id, userId) => {
  return Contact.findByIdAndRemove({ _id: id, owner: userId });
};

const changeFavoriteStatusService = (id, favorite, userId) => {
  return Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
};

module.exports = {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
};
