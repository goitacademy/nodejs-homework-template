const {
  listContactsDB,
  getByIdDB,
  addContactDB,
  removeContactDB,
  updateContactDB,
  updateStatusContactDB,
} = require("../services/contactsServices");

const listContacts = async (req, res) => {
  const contacts = await listContactsDB();
  res.json({ status: "success", code: 200, payload: { contacts } });
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getByIdDB(contactId);
  if (!contact) {
    res.status(400).json({
      status: `Failure, we didn't find the contact width id=${contactId}`,
    });
  }
  res.json({ status: "success", code: 200, payload: { contact } });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  addContactDB({ name, email, phone });
  res.json({ status: "Success" });
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  removeContactDB(contactId);
  res.json({ status: "Success" });
};

const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  updateContactDB(contactId, { name, email, phone });
  res.json({ status: "Success" });
};

const updateStatusContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const { favorite } = req.body;

    if (!favorite && favorite !== false) {
      res.status(400).json({
        status: "missing field favorite",
      });
    }
    await updateStatusContactDB(contactId, { favorite });
    res.json({ status: "Success" });
  } catch {
    res.status(404).json({
      status: " Not found ",
    });
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
