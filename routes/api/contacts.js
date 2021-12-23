const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
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
  const result = await getContactById(contactId);

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
  const body = req.body;
  const result = await addContact(body);
  res.status(200).json({
    status: "success",
    code: 201,
    message: "POST",
    data: result,
  });
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

  res.status(204).json({
    status: "success",
    code: 204,
    message: "delete by ID",
    data: result,
  });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
