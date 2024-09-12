const { HttpError } = require('../helpers');
const service = require('../service');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "missing required name field"
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'any.required': "missing required name field",
    'any.invalid': 'invalid value'
  }),
  phone: Joi.string().required().messages({
    'any.required': "missing required name field"
  }),
    favorite: Joi.boolean().required().messages({
    'any.required': "missing required name field"
    })
});

const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string(),
    favorite: Joi.boolean()
}).or('name', 'email', 'phone', 'favorite');



const get = async (req, res, next) => {
    try {
        const result = await service.getAllContacts();
        console.log(result);
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: result,
            },
        })
    }
    catch (e) {
        next(e);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await service.getContactById(contactId);
        if (!result) {
            throw HttpError(404, 'Requested contact not found');
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                contact: result,
            },
        })
    }
    catch (e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await service.createContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: { contact: result },
        })
    } catch (e) {
        next(e)
    }
};

const update = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body)
        if (error) {
            throw HttpError(400, 'invalid value for contact update');
        }
        const { contactId } = req.params;
        const result = await service.updateContact(contactId, req.body);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact: result },
        })

    }
    catch (e) {
        next(e)
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const { error } = contactUpdateSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await service.updateContact(contactId, { favorite });
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact: result },
            })
        }
    }
    catch (e) {
        next(e)
    }
};

const remove = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.deleteContact(contactId);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact: result },
        })
    }
    catch (e) {
            next(e)
        }
};


module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
}