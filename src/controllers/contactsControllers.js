const {
  getContact,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} = require("../services/contactService");

const listContactsControler = async (req, res, next) => {
  const { _id } = req.user;
  // console.log(req);

  const contacts = await getContact(_id);

  return res.json({ contacts });
};

const getContactByIdControler = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contactBiId = await getContactById(id, _id);
  res.json({ contactBiId });
};

const removeContactControler = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  await removeContactById(id, _id);
  res.json({ message: `you remove contact Id:${id}` });
};

const addContactControler = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;
  await addContact({ name, email, phone, favorite }, _id);
  res.json({
    message: `you add contact name: ${name},email: ${email}, phone: ${phone}`,
  });
};

const updateContactControler = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;
  await updateContactById(id, { name, email, phone, favorite }, _id);
  res.json({ massege: `you update contakt Id: ${id}` });
};

module.exports = {
  listContactsControler,
  getContactByIdControler,
  removeContactControler,
  addContactControler,
  updateContactControler,
};
