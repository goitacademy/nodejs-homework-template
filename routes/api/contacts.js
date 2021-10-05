const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
    message: "router.get is OK",
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (contact.length > 0) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `${contact.name} found`,
    });
  } else {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `${contact.name} not found`,
    });
  }
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
    message: `${contact.name} added`,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const remove = await removeContact(contactId);

  if (remove === false) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "/:contactId not found",
    });
  } else {
    res.json({ message: "router.delete is OK" });
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (contact.length > 0) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `${contact.name} updated`,
    });
  } else {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `${contact.name} not found`,
    });
  }
});

module.exports = router;
