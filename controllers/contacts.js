const Contacts = require('../model/contacts')

//, получить список контактов - метод GET:
const getAll = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contacts = await Contacts.listContacts(userId, req.query)
        return res.status(200).json({
            status: 'success', code: 200,
            data: {
                contacts, // toJSON
            }
        })
    } catch (e) {
        next(e)
    }
}


//, найти контакт по ID  - метод GET:
const getById = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.getContactById(userId, req.params.contactId)
        if (contact) {
            return res.status(200).json({status: 'success', code: 200, data: {contact,}})
        }
        else{
            return res.status(404).json({status: 'false', code: 404, message: "Not Found"})
        }

    } catch (e) {
        next(e)
    }
}


//, добаить контакт  - метод POST:
const create = async (req, res, next) => {
    const userId = req.user?.id
    // const contact = await Contacts.addContact({...req.body, owner: userId})
    const contact = await Contacts.addContact(userId, req.body)
    return res.status(201).json({status: 'success', code: 201, data: {contact,}})
}


// , - обновить  заменить весь объект  - метод PUT:
const update = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
        return res.status(200).json({status: 'success', code: 200, data: {contact,}})
    } catch (e) {
        next(e)
    }
}

//, - удалить контакт по ID -  метод DELETE:
const remove = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.removeContact(userId, req.params.contactId)
        return res.json({
            status: 'success', code: 200, data: {"message": "contact deleted", contact,}
        })
    } catch (e) {
        next(e)
    }
}


//, - заменить статус (изменить что-то в существующем объекте) по ID  - метод PATCH:
const updateStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id
        const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
        if (contact) {
            return res.status(200).json({status: 'success', code: 200, data: {contact,}})
        } else {
            return res.status(404).json({status: 'error', code: 404, data: 'Not Found'})
        }

    } catch (e) {
        next(e)
    }
}

const onlyMale = async (req, res, next) => res.json({status: 'success', code: 200, message: 'Only man'})
const onlyFemale = async (req, res, next) => res.json({status: 'success', code: 200, message: 'Only woman'})

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    updateStatus,
    onlyMale,
    onlyFemale,
}