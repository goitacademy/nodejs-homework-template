const express = require('express');
const router = new express.Router();
const {listContacts,
  getContactById,
  removeContact,
  addContact,
    updateContact } = require('../models/contacts');
  
    const getAll = router.get("/", async (req, res, next) => {
        const response = await listContacts();
        res.json({
            status: 200,
            response
        });
    });

    const getById = router.get('/:contactId', async (req, res) => {
        const {contactId} = req.params;
        const contact = await getContactById(contactId);

            if (!contact) {
                return res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with "id" ${contactId}  not found`,
                });
            }

            res.json({
                status: 'success',
                code: 200,
                data: contact,
            });
    });

    const addById = router.post('/', async (req, res) => {
        const newContact = await addContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: newContact,
        });
        });
   
    const deleteById = router.delete("/:contactId", async (req, res, next) => {
        const response = await removeContact(req.params.contactId);

  response === null
    ? res.json({ status: 404, message: "Not found" })
    : res.json({ status: 200, response });
    });


const updateById = router.put('/:contactId', async (req, res) => {
        const {contactId} = req.params;
        const data = await updateContact(contactId, req.body);

        if (!data) {
            return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Contact with "id" ${contactId}  not found`,
            });
        }

        if (!req.body) {
            return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'do non field all fields',
            });
        }

        res.json({
            status: 'success',
            code: 200,
            data,
        });
});

module.exports = {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
};