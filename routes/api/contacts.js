const express = require('express')
const router = express.Router()
const contacts = require('../../models/contacts')
const { checkToken } = require('../../middlewares/userMiddlewares')

router.use(checkToken);

router.get('/', async (req, res, next) => {
  try {
    const ownerId = req.user.id
    console.log("owner", ownerId)
    const allContacts = await contacts.listContacts(ownerId);
    console.log('All Contacts:', allContacts);
    res.status(200).json(allContacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if(!result) {
      return res.status(404).json({message: 'Not found'})
    }
    res.json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
// , { abortEarly: false }
router.post('/', async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body, req.user.id);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if(!result) {
      console.error(404, "not found")
    }
    res.json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    // const result = contacts.contactSchema.validate(req.body)
    // if(result.error) {
    //   return res.status(400).json({ message: result.error.message})
    // }
    const updContact = await contacts.updateContact(contactId, req.body)
    res.status(201).json(updContact)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const updContact = await contacts.updateStatusContact(contactId, req.body);
    if (!updContact) {
        console.log(req.body)

      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updContact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;