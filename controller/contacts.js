const service = require('../service/contacts');

const get = async (req, res, next) => {
    try {
        const results = await service.getAllContacts();
        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.getContactById(contactId);
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ "message": `Not found contact id ${contactId}` })
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const remove = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.removeContact(contactId);
        if (result) {
            res.status(200).json({ "message": "Contact deleted" })
        } else {
            res.status(404).json({ "message": `Not found contact id: ${contactId}` })
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const add = async (req, res, next) => {
    try {
        const result = await service.createContact(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.updateContact(contactId, req.body)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: `Not found contact id: ${contactId}` })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.updateStatusContact(contactId, req.body);
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: `Not found contact id: ${contactId}` })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}


module.exports = {
    get,
    getById,
    remove,
    add,
    update,
    updateStatus
};
