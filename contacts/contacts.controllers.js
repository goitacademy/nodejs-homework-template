const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts.services");

const listContactsHandler = async (req, res) => {
  try {
    const contacts = await listContacts();
    return res.status(200).send({ contacts });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getContactByIdHandler = async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    return res.status(200).send({ contact });
  } catch (error) {
    return res.status(404).send({ message: "Not Found" });
  }
};

const removeContactHandler = async (req, res) => {
  try {
    const contact = await removeContact(req.params.contactId);
    console.log("Handler Removed Contact:", contact);
    return res.status(202).send({ contact });
  } catch (error) {
    console.error("not deleted", error);
    return res.status(404).send({ message: "Not Found" });
  }
};

const addContactHandler = async (req, res) => {
  try {
    const contact = await addContact(req.body);
    console.log("Returned Contact:", contact);
    return res.status(201).send({ contact });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateContactHandler = async (req, res) => {
  try {
    console.log("CONTROLLERS Received contactId:", req.params.contactId);
    const updatedContact = await updateContact(req.params.contactId, req.body);
    return res.status(200).send({ updatedContact });
  } catch (error) {
    console.error("Update Handler Error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateStatusContactHandler = async (req, res) => {
  try {
    const updatedStatusContact = await updateStatusContact(
      req.params.contactId,
      req.body
    );
    return res.status(200).send({ updatedStatusContact });
  } catch (error) {
    console.error("UpdateStatus Handler Error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHandler,
};
