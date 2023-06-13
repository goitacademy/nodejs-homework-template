const Contact = require('../models/contact-schema.js')

const { HttpError } = require('../helpers');

const { cntrlWrapper } = require('../decorators')

const Joi = require('joi')

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]+$/, 'This is not numbers').required(),
    favorite: Joi.boolean()
})

const favoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required()
})


const getAllContacts = async (req, res) => {
      const { _id: owner } = req.user
      const listCon = await Contact.find({owner});
      res.status(200).json(listCon)
}

const getByIdContacts = async (req, res) => {
      const { contactId } = req.params;
      const getConById = await Contact.findById(contactId);
  
      if (!getConById) {
        throw HttpError(404, `Contact with ${contactId} not found`)
      }
      res.json(getConById);
}

const addNewContacts = async (req, res) => {
      const { error } = contactSchema.validate(req.body)
      if (error) {
        throw HttpError(400, `missing required field`)
      }
      
      const {_id: owner} = req.user
      const addCon = await Contact.create({...req.body, owner});
      res.status(201).json(addCon)
}

const updateNewContacts = async (req, res) => {
    const { error } = contactSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing field this body`)
    }

    const {contactId} = req.params;
    const upDateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!upDateContact) {
        throw HttpError(404, `Contact Not found ${contactId}`)
    }

    res.status(200).json(upDateContact)
}

const favoriteContact = async (req, res) => {
    const { error } = favoriteContactSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing field favorite"`)
    }

    const {contactId} = req.params;
    const upDateStatus = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    
    if (!upDateStatus) {
        throw HttpError(404, `Contact Not found`)
    }

    res.status(200).json(upDateStatus)
}

const deleteByIdContacts = async (req, res) => {
      const { contactId } = req.params;
      const removeCon = await Contact.findByIdAndDelete(contactId)
  
      if (!removeCon) {
        throw HttpError(404, `Contact Not found`)
    }
      
      res.status(200).json({"message": "contact deleted"})
}



module.exports = {
    getAllContacts: cntrlWrapper(getAllContacts),
    getByIdContacts: cntrlWrapper(getByIdContacts),
    addNewContacts: cntrlWrapper(addNewContacts),
    updateNewContacts: cntrlWrapper(updateNewContacts),
    favoriteContact: cntrlWrapper(favoriteContact),
    deleteByIdContacts: cntrlWrapper(deleteByIdContacts)
}