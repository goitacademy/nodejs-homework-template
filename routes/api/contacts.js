const express = require('express')
const {Contact, addSchema} = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();
const {HttpError} = require("../../helpers");

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find();
  res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:id', isValidId, async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.findById(id);
    if(!result) {
      throw HttpError(404, "Not found")
    }
  res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body);
//     if(error) {
//       throw HttpError(400, "missing required name field");
//     }
//     if(!req.body) {
//       throw HttpError(400, "missing fields");
//     }
//     const {id} = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if(!result) {
//       throw HttpError(404, "not Found");
//     }
//     res.json(result)
//   } catch (error) {
//     next(error);
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const result = await contacts.removeContact(id);
//     if(!result) {
//       throw HttpError(404, "Not found")
//     }
//     res.json({
//       message: "contact deleted"
//     });
//   } catch (error) {
//     next(error);
//   }
// })



module.exports = router
