const Contact = require('../model/contact.js')

const list = async (req, res) => {
    try {
        const contacts = await Contact.find({})
        res.status(200).json(contacts)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

const getById = async (req, res) => {

    try {
        const result = await Contact.findOne({ _id: req.params.contactId })
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const remove = async (req, res) => {
    try {
        await removeContact(req.params.contactId)
        res.status(201).json({ message: 'Deleted!' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const add = async (req, res) => {
    try {
        const result = await addContact(req.query)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const result = await updateContact(req.params.contactId, req.query)
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    list,
    getById,
    remove,
    add,
    update,
}
