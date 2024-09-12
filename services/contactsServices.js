const Contact = require("../models/contact");

function getContactsService(owner, page, limit, favorite) {
  const skip = (page - 1) * limit;

  const filter = {};

  console.log(favorite);

  if (favorite === "true") {
    filter.favorite = true;
    console.log(filter);
  }

  if (favorite === "false") {
    filter.favorite = false;
  }

  return Contact.find({ owner, favorite }, "-createdAt -updatedAt")
    .skip(skip)
    .populate("owner", "email subscription");
}

const getContactService = (contactId) => {
  return Contact.findOne({ _id: contactId }, "-createdAt -updatedAt");
};

const addContactService = (newContact) => {
  return Contact.create(newContact);
};

const updateContactService = (contactId, updatedContact) => {
  return Contact.findOneAndUpdate({ _id: contactId }, updatedContact, {
    new: true,
  });
};

const updateStatusContactService = (contactId, field) => {
  return Contact.findOneAndUpdate({ _id: contactId }, field, { new: true });
};

const removeContactService = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

module.exports = {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
