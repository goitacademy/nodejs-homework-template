const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log("no contacts");
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "no contacts found" });
    }

    res.json({
      message: "Your list of contacts",
      status: "success",
      code: 200,
      parsedContacts,
    });
    console.table(parsedContacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacs = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacs);

    const contactByID = parsedContacts.filter(
      (contact) => contact.id === contactId.toString()
    );
    console.table(contactByID);
  } catch (error) {
    console.log(error);
  }
};
async function addContact(name, email, phone) {
  try {
    const contacs = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacs);
    console.table(parsedContacts);

    const newContacts = {
      id: v4(),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    };
    console.log(newContacts);

    parsedContacts.push(newContacts);
    console.table(parsedContacts);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
  } catch (error) {
    console.log(error);
  }
}
async function removeContact(contactId) {
  try {
    const contacs = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacs);
    const remove = parsedContacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    console.table(remove);

    await fs.writeFile(contactsPath, JSON.stringify(remove), "utf-8");
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
