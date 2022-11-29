const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    req.code = 404;
    req.message = "Not Found";
    return next();
  }

  res.json({
    status: "success",
    code: 200,
    data: contactById,
  });
});

router.post("/", async (req, res, next) => {
  const contactData = req.body;
  if (!contactData.name || !contactData.email || !contactData.phone) {
    req.code = 400;
    req.message = "missing required name field";
    return next();
  }

  const newContact = await addContact(contactData);
  res.json({
    status: "success",
    code: 201,
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactDeleted = await removeContact(contactId);

  if (!contactDeleted) {
    req.code = 404;
    req.message = "Not Found";
    return next();
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: contactDeleted,
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = req.body;
  if (!contactData.name || !contactData.email || !contactData.phone) {
    req.code = 400;
    req.message = "missing fields";
    return next();
  }
  const response = await updateContact(contactId, contactData);
  if (!response) {
    req.code = 404;
    req.message = "Not Found";
    return next();
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact updated",
    data: response,
  });
});

module.exports = router;
