const express = require('express');
const router = express.Router();

const contacts = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");

router.get('/', async (req, res, next) => {
try {
  const result = await contacts.listContacts();
  res.json(result);
} 
catch(error) {
  next(error);
}
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } 
  catch(error) {
    next(error);
  }
  })


/// этого еще нет

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get("/", (req, res) => {
//   res.json(contacts);
// })

// router.get("/:id", (req, res) => {
//   res.json(contacts[0]);
// })

// router.post("/", (req, res) => {
//   res.json(contacts[0]);
// })

// router.put("/:id", (req, res) => {
//   res.json(contacts[0]);
// })

// router.delete("/:id", (req, res) => {
//   res.json(contacts[0]);
// })


// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
  //   res.json({ message: 'template message' })
  // })
  
  // router.delete('/:contactId', async (req, res, next) => {
    //   res.json({ message: 'template message' })
    // })
    
    // router.put('/:contactId', async (req, res, next) => {
      //   res.json({ message: 'template message' })
      // })
      
      
      module.exports = router;