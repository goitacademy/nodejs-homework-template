import Joi, { types } from 'joi';
import { TContactAdd } from './typesTS'

const contactPatchEmailSchema = Joi.object({
    email: Joi.string(),
})

const validatePatchEmail = (email: string) => {
    return contactPatchEmailSchema.required().validate(email);
}

const contactPatchPhoneSchema = Joi.object({
    phone: Joi.string(),
})

const validatePatchPhone = (phone: number) => {
    return contactPatchPhoneSchema.required().validate(phone);
}

const contactPatchFavoriteSchema = Joi.object({
    favorite: Joi.boolean().messages({ "any.required": "missing field favorite" }),
})

const validatePatchFavorite = (favorite: boolean) => {
    return contactPatchFavoriteSchema.required().validate(favorite);
}

const contactPatchNameSchema = Joi.object({
    name: Joi.string(),
})

const validatePatchName = (name: string) => {
    return contactPatchNameSchema.required().validate(name);
}

const contactPatchOwnerSchema = Joi.object({
    owner: Joi.any()
});

const contactAddSchema = Joi.object()
    .concat(contactPatchNameSchema.required())
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