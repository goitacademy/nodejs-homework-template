const express = require('express');
const contactsModel = require("../../models/contacts");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contacts-validation-schemes");
const { validateBody } = require("../../middlewares/validation");

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId);
  if (contact) {
    res.json({ message: 'template message' })({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post('/', validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, payload: { contact } });
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.put('/:contactId', validateBody(schemaUpdateContact), async (req, res, next) => {
  const contact = await contactsModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      payload: { contact },
    });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
}
);

module.exports = router;
