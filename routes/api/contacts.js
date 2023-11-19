const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);

    res.json({
      status: "success",
      code: 200,
      data: contact,
    });

  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    } else {
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: newContact,
    });
    
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({
        status: "error",
        code: error.status,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await removeContact(id);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    } else {
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const updatedContact = await updateContact(id, body);

    res.status(200).json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({
        status: "error",
        code: error.status,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
});

module.exports = router;
