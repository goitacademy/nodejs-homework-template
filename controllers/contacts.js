const Contacts = require('../model/contact.js')

const list = async (req, res) => {
    try {
        const contacts = await Contacts.list()
        res.status(200).json(contacts)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const result = await Contacts.findById(req.params.contactId)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const remove = async (req, res) => {
    try {
        await Contacts.remove(req.params.contactId)
        res.status(201).json({ message: 'Deleted!' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const create = async (req, res) => {
    try {
        const result = await Contacts.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.contactId

        const result = await Contacts.update(id, body)
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    list,
    getById,
    remove,
    create,
    update,
}
