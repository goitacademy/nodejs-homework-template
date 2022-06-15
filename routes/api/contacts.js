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
  res.json({
    status: "success",
    code: 200,
    data: {
      result: await listContacts(),
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
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
      result: result,
    },
  });
});

router.post("/", async (req, res, next) => {
  const result = await addContact(req.body);

  if (!result) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: result,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  await removeContact("10");

  if (!id) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "contact deleted",
    },
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
