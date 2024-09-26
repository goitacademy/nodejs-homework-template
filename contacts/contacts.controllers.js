const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../contacts/contcts.service");

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
    const contact = await updateContact({
      id: req.params.contactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    return res.status(200).send({ contact });
  } catch (error) {
    console.error("Update Handler Error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
};
