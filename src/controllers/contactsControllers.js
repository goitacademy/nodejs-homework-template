const {
  WrongParametersError,
  WrongParametersForContactByIdError,
} = require("../helpers/errors");
const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  removeContactById,
  updateStatusContact,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
  const { _id } = req.user;
  const contacts = await getContacts(_id, req.query);
  res.json({ contacts, status: "success", status_code: 200 });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const chosenContact = await getContactById(contactId);

  if (!chosenContact) {
    throw new WrongParametersForContactByIdError("Not found");
  }
  res.json({
    chosenContact,
    status: "success",
    status_code: 200,
  });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  await removeContactById(contactId);
  res.json({
    status: "success",
    status_code: 200,
    message: "contact deleted",
  });
};

const addContactController = async (req, res) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  await addContact({ name, email, phone, favorite }, _id);

  res.json({ status: "success", status_code: 201, message: "contact created" });
};

const changeContactByIdController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;
  await changeContactById({ contactId, name, email, phone, favorite });

  res.json({
    status: "success",
    status_code: 200,
    message: "contact updated",
  });
};

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  if (!favorite) {
    throw new WrongParametersError("Missing field favorite");
  }
  await updateStatusContact(contactId, req.body);
  res.json({
    status: "success",
    status_code: 200,
    message: "status updated",
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  changeContactByIdController,
  updateStatusContactController,
};
