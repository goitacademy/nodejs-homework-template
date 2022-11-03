const express = require("express");
const Joi = require('joi');


const router = express.Router();

const {listContacts , getContactById , addContact , updateContact , removeContact} = require('../../models/contacts');

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email:Joi.string().required(),
  number:Joi.string().required()
});

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.json({
    status: 200,
    result
  });
});


router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    res.status(404).json({
      code: 404,
      "message": "Not found"
    });
  };

  res.status(200).json(result);
  ;
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({result});
  } catch (error) {
    next(error)
  };
});


router.put('/:id', async (req, res, next) => {
  
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    };

    const { id } = req.params;
    
    const result = await updateContact(id, req.body);
    res.status(200).json({
      code: 200,
      result
    });
  
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({
        code: 404,
        "message": "Not Found"
      });
    };

    res.json({
      code: 204,
      message: "contact deleted",
      result
    });
  } catch (error) {
    next(error)
  };
});

module.exports = router;















// const express = require('express')

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
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

// module.exports = router
