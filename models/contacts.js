const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("models", "contacts.json");
const { validateContact } = require("./validator");

const listContacts = async (req, res, next) => {
  try {
    const result = await fs.readFile(contactsPath);
    const parsedResult = JSON.parse(result);
    res.json({
      status: "success",
      code: 200,
      message: "Contacts successfully found",
      data: {
        contacts: parsedResult,
      },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await fs.readFile(contactsPath);
    const parsedResult = JSON.parse(result);
    const searchedContact = parsedResult.find(
      (contact) => contact.id === contactId
    );
    if (searchedContact) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact successfully found",
        data: { contact: searchedContact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found a contact with id: ${contactId}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await fs.readFile(contactsPath);
    const parsedResult = JSON.parse(result);
    const contactIndexToRemove = parsedResult.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndexToRemove === -1) {
      res.status(404).json({
        status: "failure",
        code: 404,
        error: `Cannot remove a task with id: ${contactId}`,
      });
    } else {
      const actualContacts = parsedResult.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(actualContacts));
      res.json({
        status: "success",
        code: 200,
        message: "The contact has been removed",
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const addContact = async (req, res, next) => {
  const { error, value } = validateContact(req.body);
  const { name, email, phone } = value;
  try {
    const id = uuidv4();
    const result = await fs.readFile(contactsPath);
    const parsedResult = JSON.parse(result);
    if (error) {
      res.status(400).json({
        status: "failure",
        code: 400,
        error: error.details,
      });
    } else {
      const newContact = { id, name, email, phone };
      const newContacts = [...parsedResult, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
      res.json({
        status: "success",
        code: 201,
        message: "Contact successfully created!",
        data: newContact,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = validateContact(req.body);
  const { name, email, phone } = value;
  try {
    const result = await fs.readFile(contactsPath);
    const parsedResult = JSON.parse(result);
    const searchedContactIndex = parsedResult.findIndex(
      (contact) => contact.id === contactId
    );
    if (error) {
      res.status(400).json({
        status: "failure",
        code: 400,
        error: error.details,
      });
    } else {
      const updatedContact = { id: contactId, name, email, phone };
      parsedResult[searchedContactIndex] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(parsedResult));
      if (!updatedContact) {
        res.status(404).json({
          status: "failure",
          code: 404,
          message: "Not Found",
        });
      } else {
        res.json({
          status: "success",
          code: 200,
          message: "Contact successfully updated!",
          data: updatedContact,
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
