const express = require('express')
const contacts = require('../../models/contacts')

const router = express.Router();
const {HttpError} = require('../../helpers')


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result)
  } catch (error) {
    // res.status(500).json({message: "Server error"})
    next(error)
  }
 
})

router.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
    throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)

  }
 
})

router.post('/', async (req, res, next) => {
try {
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
} catch (error) {
  next(error)
}
})



// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })



module.exports = router
