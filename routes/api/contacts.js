const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  postValidationSchema,
  updateValidationSchema,
} = require("../../middleware/validationContacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await listContacts();
    return res.json({ response, status: "200" });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const response = await getContactById(contactId);
    if (response.length === 0) {
      return res
        .status(404)
        .json({ status: `Contact with id ${contactId} was not found` });
    }
    return res.json({ response, status: "200" });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
});

router.post("/", postValidationSchema, async (req, res) => {
  try {
    const contactBody = req.body;
    const response = await addContact(contactBody);
    return res.json({ response });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const response = await removeContact(contactId);
    if (response.status === "404") {
      return res
        .status(404)
        .json({ status: `Contact with id ${contactId} was not found` });
    }
    return res.json({ response });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

router.put("/:contactId", updateValidationSchema, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactBody = req.body;
    const response = await updateContact(contactId, contactBody);
    return res.json({ response });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
