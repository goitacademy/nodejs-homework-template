const service = require('../service/index');
const schemaValidate = require('../service/schemas/contactsValidate');
const mongoose = require('mongoose');

const get = async (req, res, next) => {
    try {
        const results = await service.getAllContacts();
        res.json({
            status: 'success',
            code: 200,
            data: { contacts: results }
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Invalid contactId format',
            });
        }

        const result = await service.getContactById(contactId);
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contacts: result }
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not found',
                message: `Not found contact id ${contactId}`
            })
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const remove = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Invalid contactId format',
            });
        }
        const result = await service.removeContact(contactId);
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact: result },
                message: 'Contact deleted'
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const add = async (req, res, next) => {
    const { error } = schemaValidate.validate(req.body);
    try {
        const result = await service.createContact(req.body)
        if (error) {
            const missingField = error.details[0].context.label;
            return res.status(400).json({
                message: `Missing required ${missingField} field`
            });
        }
        res.status(201).json({
            status: 'success',
            code: 201,
            data: { contact: result },
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    const { contactId } = req.params;
    const { error } = schemaValidate.validate(req.body);
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Missing fields"
            });
        }
        if (error) {
            const missingField = error.details[0].context.label;
            return res.status(400).json({
                message: `Missing required ${missingField} field`
            });
        }
        const result = await service.updateContact(contactId, req.body)
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact: result },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
        return res.status(400).json({ message: 'Missing field favorite' });
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Invalid contactId format',
            });
        }
        const result = await service.updateStatusContact(contactId, req.body)
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact: result },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: null,
            })
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
