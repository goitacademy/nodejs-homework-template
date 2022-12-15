const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  try {
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  const result = await addContact(body);

  try {
    res.status(201).json({
      status: "created",
      code: 201,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { result },
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    res.json({
      status: "success",
      code: 200,
      data: { result: await updateContact(contactId, body) },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
