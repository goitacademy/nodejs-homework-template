const express = require('express')
const {
  getContactById,
  // addContact,
  // updateContact,
  getAll,
  deleteContact,
} = require('../../models/contacts/index')
const {HttpError} =require('../../helpers')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
     const result = await getAll()
     res.json(result)
  } catch (error) {
   next(error)
  }
})


router.get('/:id', async (req, res, next) => {
 try {
   const {id} = req.params
   const result = await getContactById(id)
   
  if (!result) {
   throw HttpError(404, `Contacts ${id} not found`)
  }
   res.json(result)
   
 } catch (error) {
    next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body )
     res.json({ message: 'eemplate message' })

  } catch (error) {
    next(error )
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
     const contactId = req.params.contactId
  const result = await deleteContact(contactId)
  res.json(result)
  } catch (er) {
    res.status(500). json({
       message:'Not found '
     })
  }



})

router.put('/:contactId', async (req, res, next) => {
  try {
     res.json({ message: 'template message' })
  } catch (er) {
    res.status(500). json({
       message:'Not found '
     })
  }


})

module.exports = router



