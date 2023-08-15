const service = require('../service');
const {schemaAdd, schemaUpdate, schemaUpdateFavorite} = require('../service/schemas/validation');

const listContacts = async (req, res, next) => {
    try {
        const results = await service.listContacts()
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: results,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (!contact) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: `Not found contact id: ${contactId}`,
                data: 'Bad request',
            })
        }
        const result = await service.getContactById(contactId);
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
    }
};

const addContact = async (req, res, next) => {
    try {
        const body = await schemaAdd.validateAsync(req.body);
        const result = await service.addContact({ body });
        return res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
    }
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (!contact) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: `Not found contact id: ${contactId}`,
                data: 'Bad request',
            })
        }
        const result = await service.removeContact(contactId);
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (!contact) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: `Not found contact id: ${contactId}`,
                data: 'Bad request',
            })
        }
        const updatedData = await schemaUpdate.validateAsync(req.body);
        const result = await service.updateContact(contactId, { updatedData });
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (!contact) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: `Not found contact id: ${contactId}`,
                data: 'Bad request',
            })
        }
        const { error } = schemaUpdateFavorite.validate(req.body);
        const { favorite } = req.body;
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const result = await service.updateStatusContact(contactId, { favorite });
        return res.json({
            status: 'success',
            code: 200,
            data: {
                contact: result,
            },
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unknown error" })
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