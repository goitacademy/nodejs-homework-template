const contactsOperation = require('../../model/db');
const { NotFound } = require('http-errors');
const Joi = require('joi');
const contactsSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
})

const updateById = async (req, res, next) => {
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
};

module.exports = updateById;