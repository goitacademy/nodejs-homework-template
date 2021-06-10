import express from 'express';
import pickid from 'pickid';
import {
    listContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
} from '../../model/index.js';
const router = new express.Router();

router
    .get('/', async (req, res, next) => {
        try {
            const data = await listContacts();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    .get('/:contactId', async (req, res, next) => {
        try {
            const data = await getContactById(req.params.contactId);
            if (data) {
                return res.status(200).json({
                    status: 'OK',
                    code: res.statusCode,
                    data,
                });
            } else
                return res.status(400).json({
                    message: `Contact with id '${req.params.contactId}' not found`,
                });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .post('/', async (req, res, next) => {
        try {
            await addContact(req.body);
            res.status(200).json({ message: 'Successfully added' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    .delete('/:contactId', async (req, res, next) => {
        try {
            await deleteContact(req.params.contactId);
            res.status(200).json({
                message: `Contact with id '${req.params.contactId}' successfully deleted`,
            });
        } catch (error) {
            res.status(400).json({ message: err.message });
        }
    })
    .patch('/:contactId', async (req, res, next) => {
        res.json({ message: 'template message' });
    });

export default router;
