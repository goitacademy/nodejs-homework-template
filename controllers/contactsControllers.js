const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("models/contacts.json");
const { uuid } = require("uuidv4");

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    res.status(200).json({
      message: `Succes ${list.length} contacts in List`,
      contacts: list,
    });
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    const { id } = req.params;
    const [contact] = list.filter((item) => item.id === id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `Failure, no contact with ID: ${id} found` });
    }
    res.status(200).json({
      message: `Contact with id ${id} found!`,
      contact: contact,
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    const { name, email, phone } = req.body;
    const contact = {
      id: uuid(),
      name,
      email,
      phone,
    };
    const newList = [...list, contact];
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    res.status(201).json({ message: "New contact added", contact: contact });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!req.body) {
      res.status(400).json({ message: `missing fields` });
    }
    list.forEach((contact) => {
      if (contact.id === id) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }
      }
    });
    const newContacts = [...list];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    res.status(200).json({ message: "Post changed", contacts: newContacts });
  } catch (error) {}
};

const removeContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    const { id } = req.params;
    const findContact = list.find((item) => item.id === id);
    if (!findContact) {
      return res.status(200).json({
        message: `Contact with id ${id} not found`,
      });
    }
    const newList = list.filter((item) => item.id !== id);
    fs.writeFile(contactsPath, JSON.stringify(newList), (error) => {
      if (error) {
        return console.log("error :", error);
      }
    });
    res.status(200).json({
      message: `Contact with id ${id} deleted ${newList.length} contacts in List`,
      contact: newList,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addContact,
  updateContact,
  listContacts,
  getById,
  removeContact,
};
