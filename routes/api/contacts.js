const express = require('express');
const { listContacts, getContactById } = require('../../services/contacts');

const router = express.Router();

router.get('/contacts', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  });
  // res.status(200).json({ contacts });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contactById = await getContactById(contactId);

  // if (contactById === undefined) {
  //   throw HttpError(404, 'Not found');
  // }

  if (contactById === undefined) {
    res.json({
      status: 'not found',
      code: 404,
      message: 'Not Found',
    });
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contactById },
  });

  // try {
  //   const contactById = await getContactById(contactId);
  //   res.json({
  //     status: 'success',
  //     code: 200,
  //     data: { contactById },
  //   });
  // } catch (error) {
  //   res.status(404).json({ message: 'Not found' });
  // }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
