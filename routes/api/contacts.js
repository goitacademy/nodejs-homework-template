const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } else {
    res.status(404).json({
      status: "Not found",
      code: 404,
      data: { contact },
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = await req.body;
  if (!name) {
    res.status(400).json({
      message: "missing required name - field",
      code: 400,
    });
    return;
  }
  if (!email) {
    res.status(400).json({
      message: "missing required email - field",
      code: 400,
    });
    return;
  }
  if (!phone) {
    res.status(400).json({
      message: "missing required phone - field",
      code: 400,
    });
    return;
  }
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  await addContact(contact);
  res.json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isDelete = await removeContact(contactId);
  if (isDelete) {
    res.json({
      status: "contact deleted",
      code: 200,
    });
  } else {
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const body = {};
  let isChanges = false;
  if (name) {
    body.name = name;
    isChanges = true;
  }
  if (email) {
    body.email = email;
    isChanges = true;
  }
  if (phone) {
    body.phone = phone;
    isChanges = true;
  }
  if (!isChanges) {
    res.status(400).json({
      message: "missing fields",
      code: 400,
    });
    return;
  }
  const isExist = await updateContact(contactId, body);
  if (isExist) {
    res.json({
      status: "success",
      code: 200,
      data: { isExist },
    });
  } else {
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
});

module.exports = router;
