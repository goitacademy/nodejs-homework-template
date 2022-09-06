const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactServices");

const listContactsControlls = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const data = await listContacts(_id);
    return res.json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getContactByIdControlls = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const data = await getContactById(req.params.contactId, _id);
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeContactControlls = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const dataId = await removeContact(req.params.contactId, _id);
    if (dataId.deletedCount) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addContactControlls = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await addContact(req.body, _id);

    return res.status(201).json({ message: "add contact" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContactControlls = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  const dataId = updateContact(
    req.params.contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    _id
  );

  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

const updateStatusContactControlls = async (req, res, next) => {
  const { _id } = req.user;
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { name, phone, email, favorite } = req.body;

  const dataId = updateStatusContact(
    req.params.contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    _id
  );
  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

module.exports = {
  listContactsControlls,
  getContactByIdControlls,
  removeContactControlls,
  addContactControlls,
  updateContactControlls,
  updateStatusContactControlls,
};
