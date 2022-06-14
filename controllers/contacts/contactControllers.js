const Contact = require("../../models/contacts");

const listContacts = async (_, res) => {
  const data = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const getContactById = async (req, res) => {};

const removeContact = async (req, res) => {
  //   const data = await listContacts();
  //   const deletedContactIndex = data.findIndex(
  //     ({ id }) => id === contactId.toString()
  //   );
  //   if (deletedContactIndex === -1) return null;
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { data },
  });
};

const updateContact = async (req, res) => {
  //   const data = await listContacts();
  //   const updatedContactIndex = data.findIndex(
  //     ({ id }) => id === contactId.toString()
  //   );
  //   if (updatedContactIndex === -1) return null;
  //   data[updatedContactIndex] = { ...data[updatedContactIndex], ...body };
  //   return data[updatedContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
