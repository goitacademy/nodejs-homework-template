const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../utilities");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    HttpError(404, "Not found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  console.log("req.body", req.body);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);

//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }

//   res.json({ message: "contact deleted" });
// };

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
