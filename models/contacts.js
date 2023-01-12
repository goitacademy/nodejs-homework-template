const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log("no contacts");
      return res.status(404).json({ status: "no contacts found" });
    }

    res.json({ message: "list of contacts", parsedContacts });
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.filter(
      (contact) => contact.id === contactId
    );

    if (!contactById.length) {
      console.log("no contacts by Id");

      return res
        .status(404)
        .json({ status: `no contacts by Id: '${contactId}' found` });
    }

    res.json({ message: "contact by id", contactById });
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);

    const contactsAfterRemove = parsedContacts.filter(
      (contact) => contact.id !== contactId.toString()
    );

    console.log(contactsAfterRemove);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    let parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);

    const newContact = {
      id: uid(4),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    };
    console.log(newContact);

    parsedContacts.push(newContact);
    console.log(parsedContacts);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
