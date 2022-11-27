const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { contactValidation } = require("../../middlewares/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  }
  return res.json({
    status: "Not found",
    code: 404,
  });
});

router.post("/", contactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone });
  if (!name || !email || !phone) {
    return res.json({
      status: `missing required field`,
      code: 400,
    });
  }
  if (!contact) {
    return res.json({
      status: `Contact ${name} is already in contact list`,
      code: 400,
    });
  }
  return res.json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await removeContact(contactId);
  if (!contacts) {
    return res.json({
      message: "Not found",
      code: 404,
    });
  }
  return res.json({
    message: "Contact deleted",
    code: 200,
  });
});

router.put("/:contactId", contactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.json({
      status: `missing field`,
      code: 400,
    });
  }
  const contact = await updateContact(contactId, { name, email, phone });

  if (!contact) {
    return res.json({
      message: "Not found",
      code: 404,
    });
  }
  return res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});

module.exports = router;
