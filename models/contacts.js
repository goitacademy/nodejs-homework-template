const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    res.status(200).json(contactsListParse);
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
      res.status(200).json(contactByItem);
    } else {
      res.status(404).json({ message: "Not found" });
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
      fs.writeFile(contactsPath, JSON.stringify(contactsListWithoutItem));
      res.status(200).json({ message: "contact deleted" });
    } else res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const bodyLength = Object.keys(req.body).length;
  try {
    if (bodyLength < 3) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      const contactsList = await fs.readFile(contactsPath);
      const contactsListParse = JSON.parse(contactsList);
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
      res.status(201).json(newData);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { contactId } = req.params;

    const bodyLength = Object.keys(req.body).length;
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    const isId = contactsListParse.some((el) => el.id === contactId);
    if (bodyLength === 0) {
      res.status(400).json({ message: "missing fields" });
    } else if (!isId) {
      res.status(404).json({ message: "Not found" });
    } else {
      contactsListParse.forEach((item) => {
        if (item.id === contactId) {
          item.name = name || item.name;
          item.email = email || item.email;
          item.phone = phone
            ? `(${phone.toString().slice(0, 3)}) ${phone
                .toString()
                .slice(3, 6)}-${phone.toString().slice(6)}`
            : item.phone;
        }
      });
      fs.writeFile(contactsPath, JSON.stringify(contactsListParse));
      const responseForSuccess = contactsListParse.filter(
        (el) => el.id === contactId
      );
      res.status(200).json(responseForSuccess);
    }
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
