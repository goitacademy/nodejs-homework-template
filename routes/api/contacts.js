const express = require("express");
const router = express.Router();
const contactService = require("../../model/index");

const { validate } = require("../../helpers/validate");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../schemas/contacts.schema");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contactService.listContacts();
    return res.status(200).send(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.contactId);
    return res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createContactSchema), async (req, res, next) => {
  try {
    const newContact = await contactService.addContact(req.body);
    return res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await contactService.removeContact(
      req.params.contactId
    );
    return res.status(201).send({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId",
  validate(updateContactSchema, true),
  async (req, res, next) => {
    try {
      const updatedContact = await contactService.updateContact(
        req.params.contactId,
        req.body
      );
      return res.status(200).send(updatedContact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
