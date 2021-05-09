const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
  // updateContact,
} = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await getContactById(req.params.contactId);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
  // const { contactId } = req.params;
  // const contactById = contacts.filter((contact) => contact.id === contactId);
  // res.json({
  //   status: 'success',
  //   code: 200,
  //   data: {
  //     contactById,
  //   },
  // });
});

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const newContacts = contacts.filter((contact) => contact.id !== contactId);
//   contacts = [...newContacts];
//   res.json({ message: 'template message' });
// });

// router.patch('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const { name, email, phone } = req.body;
//   const renewedContact = contacts.filter((contact) => contact.id === contactId);
//   renewedContact.name = name;
//   renewedContact.email = email;
//   renewedContact.phone = phone;
//   res.json({
//     status: 'success',
//     code: 200,
//     data: { renewedContact },
//   });
// });

module.exports = router;
