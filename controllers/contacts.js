const {
  findContacts,
  findOneContact,
  addContact,
  deleteContactById,
  updateContact,
  updateContactStatus,
} = require("../services/contactServices");

const ctrlWrapper = require("../utils/ctrlWrapper");

const getContactList = (req, res) => {
  const contactList = findContacts();
  res.json(contactList);
};

const getOneContact = async (req, res) => {
  const foundContact = await findOneContact(req.params.contactId);
  res.json(foundContact);
};

const addNewContact = async (req, res) => {
  await addContact(req.body);

  res.status(201).json({
    message: `New contact '${req.body.name}' successfuly added to your contacts`,
  });
};

const deleteContact = async (req, res) => {
  await deleteContactById(req.params.contactId);

  res.json({
    message: `Delete contact success`,
  });
};

const updateContactById = async (req, res) => {
  await updateContact(req.params.contactId, req.body);

  res.json({
    message: `Contact: '${req.body.name}' successfuly updated`,
  });
};

const updateStatusContact = async (req, res) => {
  const result = await updateContactStatus(req.params.contactId, req.body);

  res.json(result);
};

module.exports = {
  getContactList: ctrlWrapper(getContactList),
  getOneContact: ctrlWrapper(getOneContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
