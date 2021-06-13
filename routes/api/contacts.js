import express from 'express';
import {
    listContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
    changeContact,
} from '../../model/index.js';
import {
    addContactValidation,
    updateContactValidation,
    changeContactValidation,
} from '../../middlewares/validationMiddleware.js';

const router = new express.Router();

const handleError = (res, error) =>
    res.status(400).json({ message: error.message });

router
    .get('/', async (req, res, next) => {
        try {
            const data = await listContacts();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error);
        }
    })
    .get('/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        try {
            const data = await getContactById(contactId);
            if (data) {
                return res.status(200).json({
                    status: 'OK',
                    code: res.statusCode,
                    data,
                });
            } else {
                return res.status(404).json({
                    message: `Contact with id '${contactId}' not found`,
                });
            }
        } catch (error) {
            handleError(res, error);
        }
    })
    .post('/', addContactValidation, async (req, res, next) => {
        try {
            const newContact = await addContact(req.body);
            res.status(201).json({
                message: 'Successfully added',
                contact: newContact,
            });
        } catch (error) {
            handleError(res, error);
        }
    })
    .delete('/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        try {
            await deleteContact(contactId);
            res.status(200).json({
                message: `Contact with id '${contactId}' successfully deleted`,
            });
        } catch (error) {
            handleError(res, error);
        }
    })
    .put('/:contactId', updateContactValidation, async (req, res, next) => {
        const { params, body } = req;
        const { contactId } = params;
        try {
            await updateContact(contactId, body, res);
        } catch (error) {
            handleError(res, error);
        }
    })
    .patch('/:contactId', changeContactValidation, async (req, res, next) => {
        const { params, body } = req;
        const { contactId } = params;
        try {
            await changeContact(contactId, body, res);
        } catch (error) {
            handleError(res, error);
        }
    });

export default router;
