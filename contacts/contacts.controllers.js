const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts.services");

const authService = require("../auth/auth.service");

const listContactsHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contacts = await listContacts(userId);
    return res.status(200).send({ contacts });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getContactByIdHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId, userId);
    return res.status(200).send({ contact });
  } catch (error) {
    return res.status(404).send({ message: "Not Found" });
  }
};

const removeContactHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.contactId;
    const contact = await removeContact(contactId, userId);
    return res
      .status(202)
      .send({ message: "Contact deleted succesfully", contact });
  } catch (error) {
    console.error("not deleted", error);
    return res.status(404).send({ message: "Not Found" });
  }
};

const addContactHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contact = await addContact({ ...req.body, owner: userId });
    return res.status(201).send({ contact });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateContactHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.contactId;
    const refreshedContact = { ...req.body };
    delete refreshedContact._id;

    const updatedContact = await updateContact(
      contactId,
      userId,
      refreshedContact
    );
    return res.status(200).send({ updatedContact });
  } catch (error) {
    console.error("Update Handler Error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateStatusContactHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.contactId;
    const refreshedContact = { ...req.body };
    delete refreshedContact._id;

    const updatedStatusContact = await updateStatusContact(
      contactId,
      userId,
      refreshedContact
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
