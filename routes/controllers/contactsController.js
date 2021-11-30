const { Contact } = require("../../db/contactsModel");
const createError = require("http-errors");

const getContactsController = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
};

const deleteContactController = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

const updateContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });

  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const updateFavoriteController = async (req, res) => {
  const { favorite } = req.body;
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, {
    $set: { favorite },
  });
  if (!favorite) {
    throw createError(404, "missing field favorite");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
};
