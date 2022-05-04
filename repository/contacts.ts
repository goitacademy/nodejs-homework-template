const Contact = require("../models/contact");

const listContacts = async ({ limit, page, sort }, filter, user) => {
  let option = {};
  if (filter) {
    option = { owner: user.id, favorite: filter };
  }
  if (!filter) {
    option = { owner: user.id };
  }

  const { docs: contacts, ...rest } = await Contact.paginate(option, {
    limit,
    page,
    sort,
    select: "name email phone favorite",
  });
  return { contacts, ...rest };
};

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: user.id,
  }).populate({
    path: "owner",
    select: "email subscription",
  });
  return result;
};

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: user.id,
  });
  return result;
};

const addContact = async (body, user) => {
  const result = await Contact.create({ ...body, owner: user.id });
  return result;
};

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user.id },
    { ...body },
    { new: true }
  );
  return result;
};

const checkContact = async (body, user) => {
  const result = await Contact.findOne({
    $or: [{ name: body.name }, { email: body.email }, { phone: body.phone }],
    owner: user.id,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  checkContact,
};
export {};
