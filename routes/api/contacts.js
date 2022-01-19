const express = require("express");
const router = express.Router();
const schema = require("../../validation/validation");
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  const result = await listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
    message: "get",
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getById(contactId);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "get by ID",
    data: result,
  });
});

router.post("/", async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body);
    const result = await addContact(body);

    if (!result) {
      res.status(400).json({
        code: 400,
        message: "missing required name field",
      });
    }
    res.status(200).json({
      status: "success",
      code: 201,
      message: "POST",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: `${error}`,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const body = await schema.validateAsync(req.body);
    const result = await updateContact(contactId, body);

    if (!result) {
      res.status(400).json({ message: "missing fields" });
    }

    res.status(200).json({ status: "success", message: "PUT", data: result });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: result,
  });
});

module.exports = router;
