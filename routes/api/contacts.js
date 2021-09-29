const express = require('express')
const router = express.Router()

const Contacts = require('../../model/index')
// const getAll = async () => contactsPath;

router.get('/', async (_req, res, next) => {
  try {
    const contact = await Contacts.listContacts();
    return res.json({
      // status: "Success",
      code: 200,
      // message: "Contacts found",
      data: {
        contact,
      },
    })
  }
  catch(error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const contact = await Contacts.getById(req.params.contactId);
    if (contact) {
      return res.json({
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json
        ({
        code: 404,
        message: 'Not Found',
        })
      }
      }
    catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

 module.exports = router

// module.exports = {
//   listContacts
// }