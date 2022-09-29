const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

// middleware for validations
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

// process a request for contacts list statehood

router.get("/", async (_, res) => {
  try {
    const contactList = await listContacts();
    res.json({
      contacts: contactList,
      message: "success",
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// process the request for a specific contact by ID

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const targetedContact = await getContactById(contactId);
    res.json({
      contact: targetedContact || {},
      message: targetedContact ? "success" : "Not found",
      status: targetedContact ? 200 : 404,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// process a request to add a new contact to the list

router.post("/", addContactValidation, async (req, res) => {
  try {
    const addedContact = await addContact(req.body);
    res.json({
      message: "success",
      status: 201,
      contact: addedContact,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// process a request to delete contact by ID

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const isRemovalSuccessful = await removeContact(contactId);
    res.json({
      message: isRemovalSuccessful ? "contact deleted" : "Not found",
      status: isRemovalSuccessful ? 200 : 404,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// process a request to modify some or every fields in contact

router.put("/:contactId", updateContactValidation, async (req, res) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json({
      message: `contact ${contactId} was successfully updated`,
      contact: updatedContact,
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
