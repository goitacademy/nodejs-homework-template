import Joi, { types } from 'joi';
import { TContactAdd } from './typesTS'

const contactPatchEmailSchema = Joi.object({
    email: Joi.string().required(),
})

const validatePatchEmail = (email: string) => {
    return contactPatchEmailSchema.validate(email);
}

const contactPatchPhoneSchema = Joi.object({
    phone: Joi.string().required(),
})

const validatePatchPhone = (phone: number) => {
    return contactPatchPhoneSchema.validate(phone);
}

const contactPatchFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({ "any.required": "missing field favorite" }),
})

const validatePatchFavorite = (favorite: boolean) => {
    return contactPatchFavoriteSchema.validate(favorite);
}

const contactPatchNameSchema = Joi.object({
    name: Joi.string().required(),
})

const validatePatchName = (name: string) => {
    return contactPatchNameSchema.validate(name);
}

const contactPatchOwnerSchema = Joi.object({
    owner: Joi.any()
});

const contactAddSchema = Joi.object()
    .concat(contactPatchNameSchema)
    .concat(contactPatchEmailSchema)
    .concat(contactPatchPhoneSchema)
    .concat(contactPatchFavoriteSchema)
    .concat(contactPatchOwnerSchema)

const validateContactAdd = (contact: TContactAdd) => {
    return contactAddSchema.validate(contact)
}

const outerSchema = {
    validateContactAdd,
    validatePatchEmail,
    validatePatchFavorite,
    validatePatchName,
    validatePatchPhone
}

export default outerSchema;