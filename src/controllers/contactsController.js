// контроллер в отелльлном файле
const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../model/index");

const getContactsController = async (req, res, next) => {
  const allContacts = await getContact();
  res.status(200).json(allContacts);
};

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  res.status(200).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  await deleteContact(id);
  res.status(200).json({
    message: `Contact with ID ${id} successfully deleted`,
  });
};

const addContactController = async (req, res, next) => {
  const formData = req.body;
  const newContact = await addContact(formData);
  res.status(200).json({
    message: `Contact ${newContact._id} successfully added`,
  });
};

const updateContactController = async (req, res, next) => {
  const formData = req.body;
  const { id } = req.params;

  await updateContact(id, formData);
  res.status(200).json({
    message: `Contact with ID '${id}' successfully updated`,
  });
};

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const client = await updateStatusContact(id, { favorite });
  if (client) {
    return res.status(200).json(`client with ${id} update favorite status`);
  }
  return res.status(404).json({
    message: `Not found contact id: ${id}`,
    data: "Not Found",
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
