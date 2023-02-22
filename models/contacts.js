const fsPromises = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const readContacts = async () => {
  return JSON.parse(
    await fsPromises.readFile(contactsPath, { encoding: "utf8" })
  );
};

const listContacts = async (req, res) => {
  const contacts = await readContacts();
  return res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contacts = await readContacts();
  const result = contacts.find((x) => +x.id === +contactId);
  if (!result) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const contacts = await readContacts();
  const contactId = req.params.contactId;
  const newcontacts = contacts.filter((x) => parseInt(x.id) !== +contactId);
  if (newcontacts.length === contacts.length)
    return res.status(404).json({ message: "Not found" });
  await fsPromises.writeFile(contactsPath, JSON.stringify(newcontacts));
  return res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newId = Date.now().toString();

  const newContact = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await readContacts();
  contacts.push(newContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const body = req.body;
  const contactId = String(req.params.contactId);
  const contacts = await readContacts();

  const contactToUpdate = contacts.find((x) => x.id === contactId);

  if (contactToUpdate === undefined) {
    return res.status(404).json({ message: "Not found" });
  }

  for (const field of ["name", "email", "phone"]) {
    const value = body[field];
    if (value !== undefined) {
      contactToUpdate[field] = value;
    }
  }
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
  return res.status(200).json(contactToUpdate);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
