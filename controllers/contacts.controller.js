const ContactsModel = require("../models/contacts");

const getContacts = async (req, res) => {
  const contactsList = await ContactsModel.find();
  res.json({
    status: "success",
    code: 200,
    data: contactsList,
  });
};

const getContactById = async (req, res) => {
  const contact = await ContactsModel.findOne({
    _id: req.params.contactId,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const addContact = async (req, res) => {
  const newContact = await ContactsModel.create({ ...req.body });

  if (!newContact) {
    res.status(400);
    throw new Error("Unable to create contact");
  }

  res.json({
    status: "created",
    code: 201,
    data: newContact,
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removeResult = await ContactsModel.findByIdAndRemove(contactId);

  if (!removeResult) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );

  if (!updatedContact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  console.log("contact id", contactId);

  const updateStatusContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );

  if (!updateStatusContact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: updateStatusContact,
  });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
