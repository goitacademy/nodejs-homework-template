const express = require("express");

const router = express.Router();

const contactOperations = require("../../models/contacts.js");

const { listContacts, addContact, removeContact, updateContact } =
  contactOperations;
console.log(listContacts);
console.log(addContact);
console.log(removeContact);
console.log(updateContact);

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "co.uk", ".ca"] },
  }),
  phone: Joi.string(),
});

router.get("/api/contacts", async (req, res, next) => {
  res.send("Это главный роутер");
  const contacts = await listContacts();
  res.json({
    status: 200,
    data: {
      contacts,
    },
  });
});

router.get("/api/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contact = await listContacts.findById(contactId);
    res.json({
      status: 200,
      data: {
        contact,
      },
    });
  }
});

router.post("/api/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      const contacts = await addContact(value);
      res.json({
        status: 201,
        data: {
          contacts,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.json({
      status: 400,
      message: "missing required name field",
    });
  }
});

router.delete("/api/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contacts = await removeContact(contactId);
    res.json({
      message: "contact deleted",
      status: 200,
      data: {
        contacts,
      },
    });
  }
});

router.put("/api/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!req.body) {
    res.json({
      status: 400,
      message: "missing fields",
    });
  } else if (contactId) {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      const contacts = await updateContact(contactId, value);
      res.json({
        status: 200,
        data: {
          contacts,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
});

module.exports = router;
