const Joi = require('joi');

const Contact = require('../models/contact')

const {HttpError} = require('../helpers')

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
 })

//  const addSchemaPut = Joi.object({
//   name: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.string(),
// })


 const getAll =  async (req, res, next) => {
        try {
        const allContacts = await Contact.find();
        res.json(allContacts);
        } catch (error) {
          next(error);
        }
 }

//  const getById = async (req, res, next) => {
//     try {
//       const {contactId} = req.params;
//       const contactByID = await contacts.getContactById(contactId);
//       if (!contactByID) {
//         throw HttpError(404, 'Not Found');
//       }
//       res.json(contactByID)
//     } catch (error) {
//       next(error);
     
//     } 
//   }

  const add = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const newContact = await Contact.create(req.body);
      res.status(201).json(newContact)
    } catch (error) {
      next(error);
    }
  }

//   const update =  async (req, res, next) => {
//     try {
//       const {error} = addSchemaPut.validate(req.body);
//       if (error) {
//         throw HttpError(400, error.message);
//       }
//       const {contactId} = req.params;
//       const result = await contacts.updateContact(contactId, req.body);
//       if (!result) {
//         throw HttpError(404, 'Not Found');
//       }
//       res.json(result)
//     } catch (error) {
//       next(error);
//     }
//   }

//   const remove = async (req, res, next) => {
//     try {
//       const {contactId} = req.params;
//       const result= await contacts.removeContact(contactId)
//       if (!result) {
//         throw HttpError(404, 'Not Found')
//       }
//       res.json(result)
//     } catch (error) {
//       next(error);
//     }
//   }


 module.exports= {
    getAll,
    // getById,
    add,
    // update,
    // remove,
    
 }