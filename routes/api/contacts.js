const express = require('express')

const contacts = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  }
  catch(error) {
    res.status(500).json({
       message: 'Server error' 
    })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contacts.getContactById(id)
    if(!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
      // return res.status(404).json({
      //   massage: 'Not found'
      // })
    }
    res.json(result)
  }
  catch(error) {
    const {status = 500, message= 'Server error'} = error
    res.status(status).json({
       message
    })

  }

})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
