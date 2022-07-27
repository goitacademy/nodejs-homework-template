import Joi, { types } from 'joi';
import { TContactAdd } from './typesTS'
const validateAdd = (contact: TContactAdd) => {
    const contactAddSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string(),
        phone: Joi.string(),
        favorite: Joi.boolean().default(false)
    })
    return contactAddSchema.validate(contact)
}

const validatePatchEmail = (email: string) => {
    const contactPatchEmailSchema = Joi.object({
        email: Joi.string().required(),
    })
    return contactPatchEmailSchema.validate(email);
}

const validatePatchPhone = (phone: number) => {
    const contactPatchPhoneSchema = Joi.object({
        phone: Joi.string().required(),
    })
    return contactPatchPhoneSchema.validate(phone);
}

const validatePatchFavorite = (favorite: boolean) => {
    const contactPatchFavoriteSchema = Joi.object({
        favorite: Joi.boolean().required().messages({ "any.required": "missing field favorite" }),
    })
    return contactPatchFavoriteSchema.validate(favorite);
}

const validatePatchName = (name: string) => {
    const contactPatchNameSchema = Joi.object({
        name: Joi.string().required(),
    })
    return contactPatchNameSchema.validate(name);
}


const outerSchema = {
    validateAdd,
    validatePatchEmail,
    validatePatchFavorite,
    validatePatchName,
    validatePatchPhone
}

export default outerSchema;