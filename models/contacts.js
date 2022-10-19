const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join("__dirname", "../models/contacts.json");

async function getContactList() {
  const jsonData = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(jsonData);
  return data;
}

const listContacts = async (req, res) => {
  try {
    const data = await getContactList();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Error 404 Not Found"});
  }
};


const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getContactList();
    const [filter] = await data .filter((data) => data.id === id);
    if (!filter) {
      res.status(404).json({ message: "Not Found"});
    }
    res.status(200).json(filter);
  } catch (error) {
    res.json(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getContactList();
    const findIn = await data.find((data) => data.id === id);
    if (!findIn) {
      return res.status(404).json({ message: "Not Found" });
    }
    const filter = await data.filter((data) => data.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(filter), "utf-8");
    res.status(200).json({ message: "Contact Deleted" });
  } catch (error) {
    res.send(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const data = await getContactList();
    const contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
    res.status(201).json(contact);
  } catch (error) {
    res.json(error)
  }
}

const updateContact = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    let newItem = null;
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const data = await getContactList();
    const isId = data.find((item) => item.id === id);

    if (!isId) {
      return res.status(404).json({ message: "Not Found" });
    }
    await data.forEach((item) => {
      if (item.id === id) {
        if (name) {
          item.name = name;
        }
        if (email) {
          item.email = email;
        }
        if (phone) {
          item.phone = phone;
        }
        newItem = item;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
    res.status(200).json(newItem);
  } catch (error) {
    res.json(error) 
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
