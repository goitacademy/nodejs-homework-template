const Contacts = require('../model/contacts')


const getAll = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contacts = await Contacts.listContacts(userId, req.query)
        
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contacts,
            }
        })
    } catch (error) {
        next(error)
    }

}

const getById = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.getContactById(userId, req.params.id.toString())

        if (contact) {

            return res.status(201).json({
                status: 'success',
                code: 201,
                data: {
                    contact,
                }
            })
        } else {

            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found'
            })
        }
    } catch (error) {
        next(error)
    }
}

const createContact = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.addContact(userId, req.body)

        return res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                contact,
            }
        })
    } catch (error) {
        next(error)
    }
}

const removeContact = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.removeContact(userId, req.params.id.toString())
        
        if (contact) {
            return res.status(201).json({
                status: 'success',
                code: 200,
                data: {
                    contact,
                }
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found'
            })
        }
    } catch (error) {
        next(error)
    }
}

const updateStatusContact =  async (req, res, next) => {
    try {
        if (req.body.favorite) {
            const userId = req.user?.id
            const contact = await Contacts.updateContact(userId, req.params.id.toString(), req.body)

            if (contact) {
                return res.status(201).json({
                    status: 'success',
                    code: 201,
                    data: {
                        contact,
                    }
                })
            }

        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'missing field favorite'
            })
        }
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.updateContact(userId, req.params.id.toString(), req.body)

        if (contact) {

            return res.status(201).json({
                status: 'success',
                code: 201,
                data: {
                    contact,
                }
            })
        } else {

            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found'
            })
        }
    } catch (error) {
        next(error)
        return res.status(404).json({
            status: 'error',
            code: 404,
            data: 'Not Found'
        })
    }
}

module.exports = {
    getAll,
    getById,
    createContact,
    removeContact,
    updateStatusContact,
    updateContact,

}