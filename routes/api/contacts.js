const express = require('express');
// const createError = require("http-errors")
const { NotFound } = require('http-errors');
const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
})

const contactsOperation = require('../../model/db')

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const contacts = await contactsOperation.getAll();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error)
    }
    
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsOperation.getById(id);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
            // throw createError(404, `contact whits id=${id} not found`)
            // const error = new Error(`contact whits id=${id} not found`);
            // error.status = 404;
            // throw error;
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const result = await contactsOperation.add(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { id } = req.params;
        const result = await contactsOperation.updateById(id, req.body);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsOperation.remuveById(id);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'contact delete',
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;