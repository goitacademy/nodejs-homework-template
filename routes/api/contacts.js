const express = require("express");
const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: contactsList,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      next();
    }

    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json({
      status: "created",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removeResult = await removeContact(req.params.contactId);

    if (!removeResult) {
      next();
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);

    if (!updatedContact) {
      return next();
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
