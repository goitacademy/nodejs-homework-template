const { HttpError } = require("../helpers/httpError");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
} = require("../services/contactServices");

const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  console.log("contacts: ", contacts);

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      contacts,
    },
  });
};

const getContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contactById = await getContactById(contactId);

  if (!contactById) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      contactById,
    },
  });
};

const createContactController = async (req, res, next) => {
  const { body } = req;

  await createContact(body);

  res.status(201).json({
    message: `New contact has been created!`,
    status: "success",
    code: "201",
  });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!contactId) {
    throw new HttpError(404, "Not found");
  }

  await updateContact(contactId, body);

  res.status(200).json({
    message: `Contact with id:${contactId} has been updated!`,
    status: "success",
    code: "200",
  });
};

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!contactId) {
    throw new HttpError(404, "Not found");
  }

  const updateStatusContact = await updateContact(contactId, { favorite });

  if (!updateStatusContact) {
    throw new HttpError(400, "missing field favorite");
  }

  res.status(200).json({
    message: `Favorite contact field with id:${contactId} has been updated!`,
    status: "success",
    code: "200",
  });
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!contactId) {
    throw new HttpError(404, "Not found");
  }

  await removeContact(contactId);

  res.status(200).json({
    message: `Contact with id:${contactId} has been removed!`,
    status: "success",
    code: "200",
  });
};

module.exports = {
  getContactsController,
  getContactController,
  createContactController,
  updateContactController,
  updateStatusContactController,
  deleteContactController,
};
