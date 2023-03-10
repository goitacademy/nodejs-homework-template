const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = JSON.parse(await listContacts());
  res.json({
    status: "success",
    code: 200,
    data: response,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const response = JSON.parse(await getContactById(id));
  if (response === "undefined") {
    res.json({
      status: "failed",
      code: 404,
      data: 1,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: response,
  });
});

router.post("/", async (req, res, next) => {
  try {
    const { id, email, name, phone } = req.body;
    const response = await addContact({
      id,
      name,
      email,
      phone,
    });
    res.json({
      status: "success",
      code: 200,
      data: JSON.parse(response),
    });
  } catch {
    res.status(404).send("something went wrong");
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    await removeContact(id);
    return res.status(204).send();
  } catch {
    res.json({
      status: "failed",
      code: 404,
      data: "contact not found!",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const response = await updateContact(req.params.contactId, req.body);
    res.status(201).send(response);
  } catch {
    res.status(400).send("something went wrong");
  }
});

module.exports = router;
