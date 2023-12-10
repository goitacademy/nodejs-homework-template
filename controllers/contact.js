const Contact = require('../helpers/contactSchema')
const {HttpError} = require('../helpers/HttpError')
const Joi = require("joi")
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
})


async function getContacts(req, res, next) { 
    try { 
        const responce = await Contact.find().exec()
        res.send(responce)
    } catch (e) {
        next(e)
    }    
}

async function getContactById(req, res, next) {
    const { id } = req.params
    try {
        const responce = await Contact.findById(id).exec()
        if (responce === null) {
            return res.status(404).send("Contact not found")
        }
        res.send(responce)
    } catch (e) {
        next(e)
    }
}

async function createContact(req, res, next) {
    const contact = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            favorite:req.body.favorite,
        }
    try {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(404, "Validation error")
        }
        const result = await Contact.create(contact)
        res.status(201).send(result)
    } catch (e) {
        next(e)
    }
}

async function updateContact(req, res, next) {
    const { id } = req.params
    const contact = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            favorite:req.body.favorite,
        }
    try {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(404, "Validation error")
        }
        const result = await Contact.findByIdAndUpdate(id, contact)
        if (result === null) {
            return res.status(404).send("Contact not found")
        }
        res.end()
    } catch (e) {
        next(e)
    }
}

async function deleteContact(req, res, next) {
    const { id } = req.params
    try {
        const responce = await Contact.findByIdAndDelete(id)
        if (responce === null) {
            return res.status(404).send("Contact not found")
        }
        res.send({id})
    } catch (e) {
        next(e)
    }
}
    
async function patchFavorites(req, res, next) {
    const { id } = req.params
    const { favorite } = req.body
    const contact = {
            favorite:favorite,
        }
    try {
        if (favorite !== true && favorite !== false) {
            return res.status(400).send({ "message": "missing field favorite" })  
        }
        const responce = await Contact.findByIdAndUpdate(id, contact, { new: true })
        if (responce === null) {
            return res.status(404).send("Contact not found")
        }
        res.status(200).send(responce)
    } catch(e) {
        next(e)
    }
}

module.exports = {getContacts, getContactById, createContact, updateContact, deleteContact, patchFavorites }