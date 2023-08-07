const express = require('express')
const Joi = require('joi');

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact } = require('../../models/contacts');

const contactValidation = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+) ([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
  })
);

const schemaRequired = contactValidation
  .object()
  .options({ presence: "required" })
  .required();

const schema = contactValidation.object().or("name", "email", "phone");


router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
})

router.get('/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    })
});

router.post('/', async (req, res, next) => {
    const { name, email, phone } = await req.body;
    const validation = schemaRequired.validate({ name, email, phone });
    if (validation.error) {
      res.status(400).json({
        message: validation.error.details[0].message,
        code: 400,
      });
      return;
    }

    const contact = await addContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
})

router.delete('/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
      });
    } else { 
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
});

router.put('/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      res.status(400).json({
        message: validation.error.details[0].message,
        code: 400,
      });
      return;
    }

    const isContact = await updateContact(contactId);
    isContact.name = name;
    isContact.email = email;
    isContact.phone = phone;

    if (isContact) {
      res.json({
        status: "success",
        code: 200,
        data: { ...isContact },
      });
      return;
    }
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
})

module.exports = router
