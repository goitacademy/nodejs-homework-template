const express = require('express')

const router = express.Router()

const Joi = require('joi');

const contactsOperations = require('../../models/contacts')
const createError = require("http-errors");

// схема для валидации полей добавления
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts()
        res.json({
            status: 'success',
            code: 200,
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error);
    }

})

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsOperations.getById(id);

        if (!result) {
            throw createError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {

        const {error} = schema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const result = await contactsOperations.addContact(req.body);

        console.log(result);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
    res.json({message: 'template message'})
})

router.put('/:contactId', async (req, res, next) => {
    res.json({message: 'template message'})
})

module.exports = router
