const express = require("express");
const router = express.Router();
const contactsOperations = require("../../model/contacts");
const contactsSchema = require("../../schemas/contacts");

// GET /api/contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/3
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // console.log(req.params); //все динамич.части хранятся
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContactById(contactId);
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success delete",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
