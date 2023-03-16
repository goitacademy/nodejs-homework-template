const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({ status: 200, body: contactsList })

});


router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);
  if (getContact) {
    res.json({ status: 200, data: getContact });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  const { err } = schema.validate(req.body)
  if (err) {
    res.json({ status: 400, message: 'missing required name field' });
  } else {
    const newContact = await contacts.addContact(body);
    res.json({ status: 201, data: newContact })
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (deleteContact) {
     res.json({ status: 200, data: deleteContact, message: 'contact deleted'
    })
  } else {
    res.json({ status: 404, message: 'Not found' })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const { err } = schema.validate(req.body);
  if (err) {
    console.log(err);
    return res.json({ sttaus: 400, message: 'missing fields' });
  } 
  console.log(body);
  const renameContact = await contacts.updateContact(contactId, body);
  if (renameContact) {
    res.json({ status: 200, data: renameContact });
  }else {
    res.json({ status: 404, message: 'Not found' });
  }
})

module.exports = router
