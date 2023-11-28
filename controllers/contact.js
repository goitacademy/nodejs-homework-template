const Contact = require('../helpers/contactSchema')

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
    // res.send('Create book')
    const contact = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            favorite:req.body.favorite,
        }
    try {
        const result = await Contact.create(contact)
        res.status(201).send(result)
    } catch (e) {
        next(e)
    }
}

async function updateContact(req, res, next) {
    const { contactId } = req.params
    // console.log(req.params)
     const contact = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            favorite:req.body.favorite,
        }
    try {
        const result = await Contact.findByIdAndUpdate(contactId, contact)
        
        if (result === null) {
            return res.status(404).send("Contact not found")
        }

        res.end()
        // res.status(200).send(result)
    } catch (e) {
        next(e)
    }
}

async function deleteContact(req, res, next) {
    const { contactId } = req.params
    
    try {
        const responce = await Contact.findByIdAndDelete(contactId)
        if (responce === null) {
            return res.status(404).send("Contact not found")
        }
        res.send({contactId})
    } catch (e) {
        next(e)
    }
}
    
async function patchFavorites(req, res, next) {
    const { id } = req.params
    const {favorites } = req.body

    const contact = {
            favorite:favorites,
        }
    try {

        if (favorites !== "true" && favorites !== "false") {
            res.status(400).send({"message": "missing field favorite"})
        }

        const responce = await Contact.findByIdAndUpdate(id, contact, { new: true })
        console.log(responce)
        if (responce === null) {
            return res.status(404).send("Contact not found")
        }

        res.status(200).send(responce)
    } catch(e) {
        next(e)
    }
}

module.exports = {getContacts, getContactById, createContact, updateContact, deleteContact, patchFavorites }