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
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result & (result.status === "success")) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else if (result && result.status === "error") {
      res.status(result.code).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const result = await updateContact(req.params.contactId, body);
    if (result && result.status !== 400 && result !== 400) {
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    } else if (!result) {
      res.status(404).json({
        status: "failure",
        code: 404,
        message: `Not found`,
      });
    } else {
      res.status(400).json({
        status: "failure",
        code: 400,
        message: result.message || "Provide a change to make",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
