const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const schema = require("../../validation/validation");
const contactsFunctions = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await contactsFunctions.listContacts();
  res.json({
    status: "Success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsFunctions.getContactById(id);
  if (!contact) {
    res.json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
  } else {
    res.json({
      status: "200",
      code: 200,
      data: { contact },
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const value = await schema.validateAsync({ name, email, phone });
    const contact = {
      id: uuidv4(),
      name: value.name,
      email: value.email,
      phone: value.phone,
    };
    const addedContact = await contactsFunctions.addContact(contact);
    res.json({
      status: "201",
      code: 201,
      data: { addedContact },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "400",
      code: 400,
      message: "missing required name - field",
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (await contactsFunctions.removeContact(id)) {
    contactsFunctions.removeContact(id);
    res.json({
      status: "200",
      code: 200,
      message: "Contact deleted",
    });
  } else {
    res.json({
      status: "404",
      code: 404,
      message: "Not found",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const value = await schema.validateAsync({ name, email, phone });
    const body = {
      id,
      name: value.name,
      email: value.email,
      phone: value.phone,
    };
    const updatedContact = await contactsFunctions.updateContact(id, body);
    if (updatedContact) {
      res.json({
        status: "200",
        code: 200,
        data: { updatedContact },
      });
    } else {
      res.json({
        status: "404",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "400",
      code: 400,
      message: "Missing fields",
    });
  }
});

module.exports = router;
