const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    res.json(contactsListParse);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res, next) => {
  const { params } = req;
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    const isId = contactsListParse.some((el) => el.id === params.contactId);
    const contactByItem = await contactsListParse.filter((el) => {
      return el.id === params.contactId;
    });
    if (isId) {
      res.json(contactByItem);
    } else {
      res.json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (req, res, next) => {
  const { params } = req;
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    const isId = contactsListParse.some((el) => el.id === params.contactId);
    if (isId) {
      const contactsListWithoutItem = await contactsListParse.filter((el) => {
        return el.id !== params.contactId;
      });
      const rewriteContactsListWithoutItem = await fs.writeFile(
        contactsPath,
        JSON.stringify(contactsListWithoutItem)
      );
      res.json({ message: "contact deleted" });
    } else res.json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    console.log("contactsListParse1", contactsListParse);
    const strPhone = phone.toString();
    const newData = [
      ...contactsListParse,
      {
        id: nanoid(),
        name,
        email,
        phone: `(${strPhone.slice(0, 3)}) ${strPhone.slice(
          3,
          6
        )}-${strPhone.slice(6)}`,
      },
    ];
    fs.writeFile(contactsPath, JSON.stringify(newData));
    res.json(newData);
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const strPhone = phone.toString();
  const { params } = req;
  if (!req.body) {
    res.json({ message: "missing fields" });
  }
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    console.log("contactsListParse2", contactsListParse);
    const updatedList = await contactsListParse.map((item) => {
      if (item.id === params.contactId) {
        return {
          id: params.contactId,
          name,
          email,
          phone: `(${strPhone.slice(0, 3)}) ${strPhone.slice(
            3,
            6
          )}-${strPhone.slice(6)}`,
        };
      }
      return item;
    });
    console.log("updatedList", updatedList);
    fs.writeFile(contactsPath, JSON.stringify(updatedList));
    res.json(updatedList);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
