const express = require("express");

const router = express.Router();
const { controllerWrapper: ctrlWrap } = require("../../middlewares");

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: "200",
    data: { result: contacts },
  });
});

router.get(
  "/:contactId",
  ctrlWrap(async (req, res) => {
    const { contactId } = req.params;
    const contactById = await contactsOperations.getContactById(contactId);
    if (!contactById) {
      const error = new Error(`Contact with ${contactId} id not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: "200",
      data: { result: contactById },
    });
  })
);

router.post("/", async (req, res, next) => {
  try {
    // create JOI instead of next strings
    // const { name, email, phone } = req.body;
    // if (!name || !email || !phone) {
    //   return res.status(400).json({ message: "missing required field" });
    // }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: "201",
      data: { result: newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await contactsOperations.removeContact(contactId);
    if (!contactToRemove) {
      const error = new Error(`Contact with ${contactId} id not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: "200",
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // JOI here
    const updatedContact = await contactsOperations.updateContact(contactId);
    res.status(200).json({
      status: "success",
      code: "200",
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
