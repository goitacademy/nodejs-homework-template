const methods = require("../models/contacts");
const { NotFound } = require("http-errors");

const getContactList = async (req, res, next) => {
  const contacts = await methods.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getContactsById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await methods.getContactById(contactId).catch((_) => null);
    if (!result) {
      throw new NotFound();
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const addContactById = async (req, res, next) => {
  const result = await methods.addContact(req.body, { new: true });

  return res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await methods.removeContact(contactId).catch((_) => null);
    if (!result) {
      throw new NotFound();
    }
    res.json({
      status: "success",
      code: 200,
      message: `contact with id - ${contactId} deleted`,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await methods
    .updateContact(contactId, req.body)
    .catch((_) => null);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const updateStatusContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await methods
    .updateStatusContact(contactId, req.body)
    .catch((_) => null);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};
module.exports = {
  getContactList,
  getContactsById,
  addContactById,
  deleteContactById,
  updateContactById,
  updateStatusContactById,
};
