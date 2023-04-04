const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require("../../modules/contacts/contacts");

const contactList = async (req, res, next) => {
  const data = await listContacts(req);
  res.json(data);
};

const contactById = async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    res.json({ message: "Not found", status: 404 });
  }
  res.json(data);
};

const contactPost = async (req, res, next) => {
  const data = await addContact(req);
  res.status(201).json(data); 
};

const contsctDelete = async (req, res, next) => {
  const data = await removeContact(req);
  if (!data) {
    res.json({ message: "Not found", status: 404 });
  }
  res.json({ message: "contact deleted" });
};

const contactPut = async (req, res, next) => {
  const data = await updateContact(req)
  if (!data) {
    res.json({ message: "missing fields", status: 404 })
  }
  res.json(data);
};

const contactPatch = async (req, res, next) => {
 
  const data = await updateStatusContact(req);

  if (!data) {
    res.json({ message: " Not found ", status: 404 });
  }
  res.json(data);
};

module.exports = {
  contactList,
  contactById,
  contactPost,
  contsctDelete,
  contactPut,
  contactPatch,
};
