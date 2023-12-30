const express = require('express')

const router = express.Router()


const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts.js');


// validation schema
const {
  contactValidationSchema
} = require('../../schemas/contacts.js');

// // validation
// const Joi = require('joi');

// // validation schema
// const schema = Joi.object({
//   name: Joi.string().trim().alphanum().min(2).max(16).required(),
//   email: Joi.string().trim().email({minDomainSegments: 2}).required(),
//   phone: Joi.string().trim().min(14).max(14).pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
// });


router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    message: 'contacts listed',
    data: data
  })
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const data = await getContactById(id);
  if (data === undefined) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found",
    })
  } else {
    res.json({
      status: 'success',
      code: 200,
      message: 'contact found',
      data: data
    })
  }
});

router.post('/', async (req, res, next) => {
    // validation
  try {
    await contactValidationSchema.validateAsync({ ...req.body });
  } catch (error) {
    res.json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return;
  }
  const data = await addContact(req.body);
  res.json({
    status: 'success',
    code: 201,
    message: 'contact created',
    data: data
  })
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const isDeleted = await removeContact(id);
  if (isDeleted === false) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found",
    })
  } else {
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
    })
  }
})

router.put('/:id', async (req, res, next) => {
  const id = String(req.params.id);
  // validation
  try {
    // checking if contact id is provided and if it not throws error
    switch (id.trim()) {
      case '':
      case ':id':
      case 'undefined':
      case 'null':
        throw new Error('Contact id is required');
      default:
        break;
    };
    
    // validating request body
    await contactValidationSchema.validateAsync({ ...req.body });
  } catch (error) {
    res.json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return;
  }

  // send updated contact data and wait response from db
  const updatedContact = await updateContact(id, req.body);
  // checking if contact exists and sending if it does not
  if (updatedContact === null) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found",
    })
    return;
  }
  // sending if success result
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact updated',
    data: updatedContact
  })
});

module.exports = router
