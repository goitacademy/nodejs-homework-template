const express = require('express');

const router = express.Router();
const contacts = require('../../models/contacts');
const validateFields = require('../../middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    // res.status(200).json({ msg: 'Success', data });
    return res.json(data);
  } catch (error) {
    next(error.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw new Error(404);
    }
    res.json(result);
  } catch (error) {
    next({ message: 'Not found' });
  }
});

// const validateFields = (req, res, next) => {
//   const { name, email, phone } = req.body;
//   if (!name) {
//     return res.status(400).json({ message: 'missing required name field' });
//   }

//   if (!email) {
//     return res
//       .status(400)
//       .json({ message: 'missing required email field' });
//   }

//   if (!phone) {
//     return res
//       .status(400)
//       .json({ message: 'missing required phone field' });
//   }
//   next();
// };
router.post('/', validateFields, async (req, res, next) => {
  try {
    const results = await contacts.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
