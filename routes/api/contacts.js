const express = require("express");

const router = express.Router();

const listContacts = require("../controllers/listContacts");
const addContact = require("../controllers/addContact");
const removeContact = require("../controllers/removeContact");
const updateContact = require("../controllers/updateContact");

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
  const contacts = await addContact(name, email, phone);
  res.json({
    status: 200,
    data: {
      contacts,
    },
  });
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

  res.json({ message: "template message" });
});

module.exports = router;
