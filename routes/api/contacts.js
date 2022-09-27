const express = require('express')
const router = express.Router()
const Joi = require("joi")
const Contact = require('../../models/contacts')


const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const FavoriteUpdateSchema = Joi.object({
    favorite: Joi.boolean().required(),
});


router.get('/', async (req, res, next) => {
    try {
        const result = await Contact.find()
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        })
    }
})


router.get('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params
        const result = await Contact.find({_id: contactId})

        res.json(result)
    } catch (error) {
        res.status(404).json({
            message: "Not found",
        })
    }
})


router.post('/', async (req, res, next) => {
    try {
        const {error} = contactsSchema.validate(req.body)
        if (error) {
            res.status(400).json({
                message: "Missing required field",
            })
        }
        const result = await Contact.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
})

router.put('/:contactId', async (req, res, next) => {
    try {
        const {error} = contactsSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: "missing fields",
            });
        }
        const {contactId} = req.params
        const result = await Contact.findOneAndUpdate({_id: contactId}, req.body)
        if (!result) {
            return res.status(404).json({
                message: "Not found",
            });
        }
        res.json({message: "Contact updated"})
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
    try {
        const {error} = FavoriteUpdateSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: 'Missing field favorite'
            })
        }
        const {contactId} = req.params
        const result = await Contact.findByIdAndUpdate({_id: contactId}, req.body);
        if (!result) {
            return res.status(404).json({
                message: "Not found",
            })
        }
        res.json({message: "Contact updated"});
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
        const {contactId} = req.params
        const result = await Contact.remove({_id: contactId})
        if (!result) {
            res.status(404).json({
                message: "Not found",
            });
        }
        res.json({
            message: "Contact deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
})


module.exports = router
