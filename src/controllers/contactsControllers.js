const {
  getContact,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} = require("../services/contactService");

const listContactsControler = async (req, res, next) => {
  const contacts = await getContact();

  return res.json({ contacts });
};

const getContactByIdControler = async (req, res, next) => {
  const { id } = req.params;
  const contactBiId = await getContactById(id);
  res.json({ contactBiId });
};

const removeContactControler = async (req, res, next) => {
  const { id } = req.params;
  await removeContactById(id);
  res.json({ message: `you remove contact Id:${id}` });
};

const addContactControler = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  await addContact({ name, email, phone, favorite });
  res.json({
    message: `you add contact name: ${name},email: ${email}, phone: ${phone}, favorit: ${
      !favorite ? "false" : "true"
    }`,
  });
};

const updateContactControler = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;
  await updateContactById(id, { name, email, phone, favorite });
  res.json({ massege: `you update contakt Id: ${id}` });
};

module.exports = {
  listContactsControler,
  getContactByIdControler,
  removeContactControler,
  addContactControler,
  updateContactControler,
};
