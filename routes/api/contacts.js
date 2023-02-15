const express = require("express");
const createError = require("http-errors");
const {
  addPostsValidation,
  updatePostValidation,
} = require("../../middleware/validationMiddleware");
const router = express.Router();
const contactsOperations = require("../../models/contacts");

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

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContact = await contactsOperations.getContactById(contactId);
    if (!getContact) {
      return next(createError(404, `Contact with id ${contactId} not found`));
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: getContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);
    if (!deletedContact) {
      return next(
        createError(404, `Contact with id ${contactId} can not be deleted`)
      );
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id ${contactId} has been deleted`,
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {

  try {
    const { error } = addPostsValidation.validate(req.body);
    if (error.status = 400) {
      next(error);
    }
    const addContact = await contactsOperations.addContact(req.body);

    res.json({
      status: "success",
      code: 201,
      data: {
        addContact,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updatePostValidation.validate(req.body);
    if (error.status = 400) {
      next(error);
    }
    const { contactId } = req.params;
    const { name, email } = req.body;
    const updatedContact = await contactsOperations.updateContact(contactId, {
      name,
      email,
    });
    if (!updatedContact) {
      return next(createError(404, `Something went wrong`));
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
