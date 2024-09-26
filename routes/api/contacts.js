const express = require('express');

const ctrl = require("../../controllers/contacts")

const { 
    validateBody,
    isValidId,
    haveBody,
    authenticate,
 } = require("../../middlewares")

const {schemas} = require("../../models/contact")

const router = express.Router()


router.get('/', authenticate, ctrl.listContacts)

router.get('/:id',authenticate, isValidId,  ctrl.getById)

router.post('/', haveBody, authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:id',authenticate, isValidId, ctrl.deleteById)

router.put('/:id',authenticate, isValidId, haveBody, validateBody(schemas.addSchema), ctrl.updateContact)

router.patch('/:id/favorite',authenticate, isValidId, validateBody(schemas.updateFavoriteSchema),ctrl.updateFavorite);

module.exports = router






// const express = require('express');
// const Joi = require("joi")

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers/");

// const router = express.Router()

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })

// router.get('/', async (req, res, next) => {
//   try{
//       const result = await contacts.listContacts();
//       res.json(result);
//   }
//   catch(error){
//     next(error)
//       // res.status(500).json({ message: "Server error" })
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try{
//     const {id} = req.params;

//     const result = await contacts.getById(id);
//     if(!result) {
//       throw HttpError (404, "Not found");
//       // return res.status(404).json({ "message": "Not found" })
//       // ***
//       // const error = new Error("Not found");
//       // error.status = 404;
//       // throw error;
//     }
//     res.json(result);
// }
// catch(error){
//   next(error)
//     // res.status(500).json({ "message": "Server error" })
//     // ***
//     // const {status = 500, message = "Server error"} = error;
//     //     res.status(status).json({ 
//     //       message: "Server error" })

// }})

// router.post('/', async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body)
//     if(error) {
//       throw HttpError (400, "missing required name field");
//     }
//       const result = await contacts.addContact(req.body);
//       res.status(201).json(result);
// }
//   catch(error){
//     next(error)

// }})

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const result = await contacts.removeContact(id);
//     if(!result) {
//       throw HttpError (404, "Not found");
//     }
//       res.status(200).json({message:"contact deleted"});
//       // res.json({message:"contact deleted"});

// }
//   catch(error){
//     next(error)

// }})

// router.put('/:id', async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body);
//     if(error) {
//         throw HttpError(400, "missing fields");
//     }
//     const {id} = req.params;
//     const result = await books.updateContact(id, req.body);
//     if(!result) {
//         throw HttpError(404, "Not found");
//     }
//     res.json(result);
// }
// catch(error) {
//     next(error);
// }
// })

// module.exports = router