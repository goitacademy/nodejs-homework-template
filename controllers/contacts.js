const Contact = require("../service/schemas/schemas.js").Contact;
const httpError = require("../helpers/httpError");
const Wrapper = require("../helpers/Wrapper");

const listContacts = async (_, res) => {
  console.log('1');
  const result = await Contact.find();
  console.log(Contact);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.getContactById(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.addContact(req.body);
  res.status(201).json(result); 
}

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.removeContact(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  }); 
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.updateContact(id, req.body);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
}

module.exports = {
  listContacts: Wrapper(listContacts),
  getContactById: Wrapper(getContactById),
  removeContact: Wrapper(removeContact),
  addContact: Wrapper(addContact),
  updateContact: Wrapper(updateContact),
};
