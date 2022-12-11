const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await contacts.getContactById(req.params.id);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;

      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  const result = await contacts.addContact();
  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await contacts.removeContact();
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

module.exports = router;
