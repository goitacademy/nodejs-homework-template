const express = require('express')

const router = express.Router()


const contacts = require('../../models/contacts');



router.get('/', async (req, res, next) => {
  const contact = await contacts.listContacts()
  
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  });
 
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId)

  if(!contact) {
    res.status(404).json({
    status: 'error',
    code: 404,
    message: "Not found",
    })
  }

  res.json({
    status: 'success',
    code: 200,
    data: { 
      contact, 
    }
  })
})

router.post('/', async (req, res, next) => {
  const contact = await contacts.addContact(req.body)
if(!contact){
  res.status(400).json({
    status: 'HTTP 400 Bad Request',
    code: 400,
    message: "missing required name field"
  })
}

  res.status(201).json({
    status: 'created',
    code: 201,
    data: { 
      contact 
    },
  });
  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId)
  if(!contact){
    res.status(404).json({
      status: 'error',
      code: 404,
      message: "Not found"
    })}
    res.status(200).json({
      status: 'success',
      code: 200,
      message: "contact deleted"
    })
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body)
  if(contact==="no body"){
    res.status(400).json({
      status: 'HTTP 400 Bad Request',
      code: 400,
      message:"missing fields"
    })
  }
  
  if(!contact){
    res.status(404).json({
      status: 'not found',
      code: 404,
      message:"Not found"
    })
  }

  res.json({
    status: 'success',
    code: 200,
    data: { 
      contact, 
    }
  })
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  res.render('response', { title: 'Simple express app', email, password });
});

module.exports = router
