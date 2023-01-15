let contacts = require("../../models/contacts.json");

const listContacts = (req, res) => {
  res.status(200).json(contacts);
};

const getContactById = (req, res) => {
  const { id } = req.params;
  const contact = contacts.filter((contact) => contact.id === id);
  if (!contact) {
    return res
      .status(404)
      .json({
        status: "failure",
        message: ` Contact with id '${id}' not found`,
      });
  }
  res.status(201).json({ contact, status: "success" });
};

const removeContact = (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter((contact) => contact.id !== id);

  res
    .status(200)
    .json({ contacts, status: "success", message: "Contact deleted" });
};

const addContact = (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  contacts.push({
    id: Date.now(),
    name,
    email,
    phone,
  });
  res
    .status(201)
    .json({ contacts, status: "success", message: "Contact added" });
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  contacts.forEach((contact) => {
    if (contact.id === id) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  res
    .status(200)
    .json({ contacts, status: "success", message: "Contact updated" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
