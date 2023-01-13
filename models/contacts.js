const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log("no contacts");
      return res.status(404).json({ message: "no contacts found", code: 404 });
    }

    res.json({ message: "list of contacts", code: 200, parsedContacts });
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
      console.log(`no contacts by id: '${contactId}' found`);

      return res.status(404).json({
        message: `no contacts by id: '${contactId}' found`,
        code: 404,
      });
    }

    res.json({
      message: `contact by id: '${contactId}'`,
      code: 200,
      contactById,
    });
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contacts = await fs.readFile(contactsPath, "utf-8");
    let parsedContacts = JSON.parse(contacts);

    const newContact = {
      id: uid(4),
      name,
      email,
      phone,
    };
    console.log(newContact);

    parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");

    res.status(201).json({ message: "contact created", code: 201, newContact });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId
    );
    console.log("contact to delete:", contactById);

    if (!contactById) {
      console.log(`no contacts by id: '${contactId}' found`);

      return res.status(404).json({
        message: `no contacts by id: '${contactId}' found`,
        code: 404,
      });
    }

    const contactsAfterRemove = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    res.status(200).json({
      message: `contact by id: '${contactId}' deleted`,
      code: 200,
      contactsAfterRemove,
    });

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

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const contacts = await fs.readFile(contactsPath, "utf-8");
    let parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactById) {
      console.log(`no contacts by id: '${contactId}' found`);

      return res.status(404).json({
        message: `no contacts by id: '${contactId}' found`,
        code: 404,
      });
    }

    parsedContacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        res.status(200).json({
          message: `updated contact by id: '${contactId}' `,
          code: 200,
          contact,
        });
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
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
