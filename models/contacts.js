const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const parseContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async (req, res) => {
  try {
    const contacts = await parseContacts();

    return res.status("200").json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await parseContacts();
    const [contactFind] = contacts.filter(
      (contact) => Number(contact.id) === Number(contactId)
    );

    if (!contactFind) {
      return res.status("404").json({ message: "Not found" });
    }

    return res.status("200").json(contactFind);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contacts = await parseContacts();
    const contactsUpdate = contacts.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdate));

    if (contacts.length === contactsUpdate.length) {
      return res.status("404").json({ message: "not found" });
    }

    return res.status("200").json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const id = Date.now().toString();
  const newContact = { id, name, email, phone };

  try {
    const data = await parseContacts();
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data));

    return res.status("201").json(newContact);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const data = await parseContacts();
    const contactIndex = data.map(({ id }) => id).indexOf(contactId);

    if (contactIndex < 0) {
      return res.status("404").json({ message: "not found" });
    }

    data[contactIndex] = { ...data[contactIndex], ...req.body };
    await fs.writeFile(contactsPath, JSON.stringify(data));

    return res.status("200").json(data[contactIndex]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
