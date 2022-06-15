const { Contact } = require("../../models/contacts");

const listContacts = async (_, res) => {
  const data = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  res.json({ status: "success", code: 200, data });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);
  res.json({
    message: "contact successfully deleted",
    statusOperation: "success",
  });
};

const addContact = async (req, res) => {
  if (!req.body.favorite) req.body.favorite = false;
  const data = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined)
    res.status(400).json({ message: "missing field favorite" });
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
