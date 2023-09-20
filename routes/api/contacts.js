const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

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
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
});

module.exports = router;
