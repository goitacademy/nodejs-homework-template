const cntMethod = require("../models/index");
const HttpError = require("../Helpers/HttpError");
const ctrlWrapper = require("../Helpers/cntWrapper");

const getAllContacts = async (req, res) => {
  const contacts = await cntMethod.listContacts();
  console.log(contacts);
  res.json({
    status: 200,
    data: {
      contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await cntMethod.getContactById(id);
  if (!contact) {
    throw HttpError(404, `Movie with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      contact,
    },
  });
};

const addContact = async (req, res) => {
  const newContact = await cntMethod.addContact(req.body);
  res.json({
    status: 201,
    data: {
      newContact,
    },
  });
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await cntMethod.removeContact(id);
  if (!removedContact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      removedContact,
    },
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await cntMethod.updateContact(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      updatedContact,
    },
  });
};

const setFaforited = async (req, res, next) => {
  const { id } = req.params;

  const setFaforited = await cntMethod.setFaforited(id, req.body);
  if (!setFaforited) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      setFaforited,
    },
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  setFaforited: ctrlWrapper(setFaforited),
};
