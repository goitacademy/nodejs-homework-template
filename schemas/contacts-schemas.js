import Joi from "joi";

const commonFields = {
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
};

export const addSchema = Joi.object({
    name: commonFields.name.required(),
    email: commonFields.email.required(),
    phone: commonFields.phone.required(),
    favorite: commonFields.favorite,
});

export const updateSchema = Joi.object(commonFields).or(
    "name",
    "email",
    "phone",
    "favorite"
);

export const updateFavoriteSchema = Joi.object({
    favorite: commonFields.favorite.required().messages({
        "boolean.base": "field favorite must be false or true",
        "any.required": "missing field favorite",
    }),
});