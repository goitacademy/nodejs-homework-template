/* const { v4: uuidv4 } = require("uuid"); */
const ContactModel = require("../models/contacts"); // Importa las funciones directamente

const listContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.listContacts(); // Usa la función directamente
    res.status(200).json({ status: "success", code: 200, contacts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await ContactModel.getContactById(contactId);
    res.status(200).json({ status: "success", code: 200, contact });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not foundd" });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    await ContactModel.removeContact(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "The contact was remove succesfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not found" });
  }
};
const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = await ContactModel.addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      message: `Contact ${newContact.id} added successfully`,
    });
  } catch (error) {
    console.error("Error:", error.message);
    if (error.message === ContactModel.ERROR_MESSAGES.CONTACT_ALREADY_EXISTS) {
      res
        .status(400)
        .json({ error: ContactModel.ERROR_MESSAGES.CONTACT_ALREADY_EXISTS });
    } else if (
      error.message === ContactModel.ERROR_MESSAGES.MISSING_PARAMETERS
    ) {
      res
        .status(400)
        .json({ error: ContactModel.ERROR_MESSAGES.MISSING_PARAMETERS });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  // Verificar si el cuerpo está vacío
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Request body is empty",
    });
  }
  try {
    const updatedContact = await ContactModel.updateContact(
      contactId,
      name,
      email,
      phone
    );
    res
      .status(200)
      .json({ status: "success", code: 200, contact: updatedContact });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not found" });
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

/* 



const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const updatedContact = await contactModel.updateContact(contactId, body);
    res.status(200).json({ status: 'success', code: 200, contact: updatedContact });
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ error: 'Contact not found' });
  }
}; */
