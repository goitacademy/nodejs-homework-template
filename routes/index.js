const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Contact = require('../models/contact.js')

const contactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, "-createdAt -updatedAt");
        res.status(200).json(
            {
                status: "success",
                data: contacts,
            });
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            throw new Error('Contact not found.')
        }
        res.status(200).json(
            {
                status: "success",
                data: contact,
            });
    } catch (error) {
        res.status(400).json({
            status: "error",
            data: {
                message: error.message,
            }
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, phone, email } = req.body;
        const favorite = false;
        const validate = contactSchema.validate({
            name, phone, email, favorite
        });
        validate.error && res.status(400).json({
            status: "failed",
            message: validate.error.message
        });
        const newContact = await Contact.create({ name, phone, email, favorite })
        res.status(201).json({
            status: "success",
            data: newContact
        });
    } catch (error) {
        next(error);
    }

})

router.put('/:id', async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const validate = contactSchema.validate(
            body
        );
        validate.error && res.status(400).json({
            status: "failed",
            message: validate.error.message
        });
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            body,
            { new: true });
        if (!updatedContact) {
            throw new Error('Contact not found.')
        };
        res.status(201).json({
            status: "success",
            message: 'Contact updated.',
            data: updatedContact
        })
    } catch (error) {
        console.log(error)
        next(error);
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndRemove(id);
        if (!deletedContact) {
            throw new Error('Contact not found.')
        }
        res.status(200).json({
            status: "success",
            message: "Contact deleted.",
            data: deletedContact
        })
    } catch (error) {
        next(error);
    }
})

router.patch('/:id/favorite', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(id, { favorite }, {
            new: true
        })
        if (!updatedContact) {
            throw new Error('Contact not found.')
        }
        res.status(200).json({
            status: "success",
            message: "Contact updated.",
            data: updatedContact
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router


