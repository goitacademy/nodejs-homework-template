const Contacts = require('../repository/contacts')


const getListOfContacts = async (req, res, next) => {
    try {
        const userId = req.user.contactId
        const contacts = await Contacts.getListContacts(userId, req.query)
        res.json({
            status: 'success',
            code: '200',
            data: {
                ...contacts
            },
        })
    } catch (error) {
        next(error)
    }

}

const getContactById = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.getContactById(req.params.contactId, userId)
        if (contact) {
            return res.status(200).json({
                status: 'success',
                code: '200',
                data: {
                    contact
                },
            })
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not Found",
            })
        }
    } catch (error) {
        next(error)
    }
}
// create, save contact
const createContact = async (req, res, next) => {
    try {
        const userId = req.user.contactId
        const contact = await Contacts.addContact({ ...req.body, owner: userId })
        return res.status(201).json({
            status: 'success',
            code: '201',
            data: {
                contact
            },
        })
    } catch (error) {
        next(error)
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const userId = req.user.contactId
        const contact = await Contacts.removeContact(req.params.contactId, userId)
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: {
                    contact,
                },
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const userId = req.user.contactId
        const { name, email, phone } = await Contacts.updateContact(req.params.contactId, req.body, userId)
        if (name || email || phone) {
            return res.json({
                status: 'success',
                code: '200',
                data:
                    { name, email, phone }
            },
            )
        } else {
            return res.json({
                status: 'error',
                code: '404',
                data: 'missing fields'
            })
        }


    } catch (error) {
        next(error)
    }
}

const updatePhone = async (req, res, next) => {
    try {
        const userId = req.user.contactId
        const { phone } = await Contacts.updateContact(req.params.contactId, req.body, userId)
        if (phone) {
            res.json({
                status: 'success',
                code: '200',
                data:
                    { phone }
            },
            )
        }
        else {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not Found",
            });
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getListOfContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updatePhone
}
