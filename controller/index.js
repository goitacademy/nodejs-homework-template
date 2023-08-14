const service = require('../service');
const {schemaAdd, schemaUpdate} = require('../service/schemas/validation');

const listContacts = async (req, res, next) => {
    try {
        const results = await service.listContacts()
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: results,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.getContactById(contactId);
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    contact: result,
                },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const addContact = async (req, res, next) => {
    try {
        const body = await schemaAdd.validateAsync(req.body);
        const result = await service.addContact({ body });
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.removeContact(contactId);
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    contact: result,
                },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const updatedData = await schemaUpdate.validateAsync(req.body);
        const result = await service.updateContact(contactId, { updatedData });
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    contact: result,
                },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const result = await service.updateStatusContact(contactId, { favorite });
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    contact: result,
                },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}