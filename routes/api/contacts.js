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
  const response = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: response,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const response = await getContactById(id);
  if (response === "undefined") {
    res.json({
      message: "Not found",
      code: 404,
    });
  }
  res.json({
    status: "Success",
    code: 200,
    data: JSON.parse(response),
  });
});

router.post("/", async (req, res, next) => {
  const keys = Object.keys(req.body);
  try {
    const response = await addContact(req.body);
    const rawElement = response.slice(1, response.length - 1);
    const missingElement = keys.find((el) => el === rawElement);
    if (missingElement) {
      res.status(400).send(`Something wrong with "${missingElement}" field`);
    }
    res.json({
      status: "Success",
      code: 201,
      data: JSON.parse(response),
    });
  } catch {
    res.status(404).send(`Not found`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    await removeContact(id);
    return res.status(200).send("Contact deleted");
  } catch {
    res.json({
      status: 404,
      message: "Not found!",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Missing fields!");
  }
  try {
    const response = await updateContact(req.params.contactId, req.body);
    res.status(200).send(response);
  } catch {
    res.status(404).send("Not found!");
  }
});

module.exports = router;
