const express = require("express");

const router = express.Router();

const nanoid = require("nanoid");

const contactsFunctions = require("../../models/contacts");

router.get("/api/contacts", (req, res, next) => {
  res.json({
    status: "Success",
    code: 200,
    data: contactsFunctions.listContacts(),
  });
});

router.get("/api/contacts/:id", (req, res, next) => {
  const { id } = req.body;
  const [contact] = contactsFunctions.getContactById(id);
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

router.post("/api/contacts", (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.json({
      status: "400",
      code: 400,
      message: "missing required name - field",
    });
  } else {
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const [addedContact] = contactsFunctions.addContact(contact);
    res.json({
      status: "200",
      code: 200,
      data: { addedContact },
    });
  }
});

router.delete("/api/contacts/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      status: "404",
      code: 404,
      message: "Not found",
    });
  } else {
    contactsFunctions.removeContact(id);
    res.json({
      status: "200",
      code: 200,
      message: "Contact deleted",
    });
  }
});

router.put("/api/contacts/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.json({
      status: "400",
      code: 400,
      message: "Missing fields",
    });
  } else {
    const body = {
      id,
      name,
      email,
      phone,
    };
    const [updatedContact] = contactsFunctions.updateContact(id, body);
    if (!updatedContact) {
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
  }
});

module.exports = router;
