const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteById,
} = require("../service/index.js");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({ ...contacts });
};
const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  console.log('ID z parametrów:', id);
  const contact = await getContactById(id);
  if (contact.status === "ERROR") {
    return res.status(404).json({ error: "Contact not found" });
  }
  console.log('Odpowiedź z getContactById:', contact);
  res.json({ ...contact });
};
const postContactController = async (req, res) => {
  const { body } = req;
  const contact = await addContact(body);
  res.json({ ...contact });
};
const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  res.json({ ...contact });
};
const putContactController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const contact = await updateContact(id, body);
  res.json({ ...contact });
};

const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  console.log("favorite: ", favorite);

  const contact = await updateFavoriteById(id, favorite);

  res.json({ ...contact });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
};