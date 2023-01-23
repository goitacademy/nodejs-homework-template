const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      return res.status(404).json({ message: "no contacts", code: 404 });
    }

    res.json({ message: "list of contacts", code: 200, parsedContacts });
    console.table(parsedContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contactById = parsedContacts.filter(
      (contact) => contact.id === contactId
    );

    if (!contactById.length) {
      return res.status(404).json({
        message: `id ${contactId} not found`,
        code: 404,
      });
    }

    res.json({
      message: `contacn by id ${contactId}`,
      code: 200,
      contactById,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contactById = parsedContacts.filter(
      (contact) => contact.id === contactId
    );

    if (!contactById.length) {
      return res.status(404).json({
        message: `id ${contactId} not found`,
        code: 404,
      });
    }

    const contactsListAfterRemove = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    res.status(200).json({
      message: `contact by id ${contactId} deleted`,
      code: 200,
      contactsListAfterRemove,
    });

    await fs.writeFile(
      contactPath,
      JSON.stringify(contactsListAfterRemove),
      "utf-8"
    );
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    parsedContacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(parsedContacts), "utf-8");

    res.status(201).json({
      message: "contact created",
      code: 201,
      newContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactById) {
      console.log(`no contacts by id: '${contactId}' found`);

      return res.status(404).json({
        message: `id ${contactId} not found`,
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

    await fs.writeFile(contactPath, JSON.stringify(parsedContacts), "utf-8");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
