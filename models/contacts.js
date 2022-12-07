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
const removeContact = async (req, res) => {}

const addContact = async (req, res) => {}

const updateContact = async (req, res) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
