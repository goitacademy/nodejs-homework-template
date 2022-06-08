const express = require("express");

const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  listContacts().then((data) => {
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  getContactById(contactId).then((data) => {
    res.json({
      status: "success",
      code: 200,
      data,
    });
  });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
