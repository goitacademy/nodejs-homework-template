const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("__dirname", "../models/contacts.json");

const getListContact = async () => {
  const dataJson = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataJson);
  return data;
}
// 1
const listContacts = async (req, res) => {
  try {
    const data = await getListContact();
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ massage: "Server error" })
  }
};
// 2
const getContactById = async (req, res) => {
  try {
    const id  = req.params.id;
    const data = await getListContact();
    const [filter] = await data.filter((data) => data.id === id);
    
    if (!filter) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(filter);
  } catch (error) {
    res.json(error);
  }
}
// 3
const removeContact = async (req, res) => {

}

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const data = await getListContact();
    const contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    res.status(201).json(contact);
  } catch (error) {
    res.json(error);
  }
}

const updateContact = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    let newItem = null;
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const data = await getListContact();
    const isId = data.find((item) => item.id === id);

    if (!isId) {
      return res.status(404).json({ message: "Not found" });
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

    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    res.status(200).json(newItem);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
