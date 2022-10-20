const Joi = require("joi");
const { ValidationError, WrongParametersError } = require("../../helpers/errors");
const { Contact } = require("../../db/contactsModel");

module.exports = {
    validateObjectId: (req, res, next) => {
        const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
        const validId = schema.validate(req.params.id);

        if (validId.error) {
            next(new WrongParametersError("Not found"));
        }
        next();
    },

    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            favorite: Joi.boolean(),
        });
        const validResult = schema.validate(req.body);

        if (validResult.error) {
            const [result] = validResult.error.details;
            const [missingParam] = result.path;
            return next(
                new ValidationError(`missing required ${missingParam} field`)
            );
        }
        next();
    },

    removeContactValidation: async (req, res, next) => {
        const id = req.params.id;
        const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
        const validId = schema.validate(id);

        if (validId.error) {
            return next(new WrongParametersError("Not found"));
        }

        const contact = await Contact.findById(id);
        if (!contact) {
        return next(new WrongParametersError("Not found"));
        }
        next();
    },

    updateContactValidation: async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "missing fields" });
        }

        const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
        const validId = schema.validate(req.params.id);

        if (validId.error) {
            next(new WrongParametersError("Not found"));
        }

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return next(new WrongParametersError("Not found"));
        }
        next();
    },

    updateStatusContactValidation: async (req, res, next) => {
        const schemaId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
        const validId = schemaId.validate(req.params.id);

        if (validId.error) {
            return next(new WrongParametersError("Not found"));
        }

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return next(new WrongParametersError("Not found"));
        }

        const schema = Joi.object({
            favorite: Joi.boolean().required(),
        });
        const validResult = schema.validate(req.body);
        if (validResult.error) {
            return next(new ValidationError("missing field favorite"));
        }
        next();
    },
};