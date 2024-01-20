import Joi from 'joi'
import { Schema, model } from 'mongoose'
import validator from 'validator'
import { addUpdateSettings, handleSaveError } from './hooks.js'

const contactsSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 20 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
)

contactsSchema.post('save', handleSaveError)

contactsSchema.pre('findOneAndUpdate', addUpdateSettings)

contactsSchema.post('findOneAndUpdate', handleSaveError)

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': `missing required name field` }).min(5).max(20),
  email: Joi.string().required().email().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!validator.isMobilePhone(value)) {
        return helper.message('phone is incorrect')
      }
      return value
    })
    .messages({ 'any.required': 'missing required phone field' }),
})

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(5).max(20),
  email: Joi.string().email(),
  phone: Joi.string().custom((value, helper) => {
    if (!validator.isMobilePhone(value)) {
      return helper.message('phone is invalid')
    }
    return value
  }),
})

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({ 'any.required': 'missing field favorite' }),
})

export const Contact = model('contact', contactsSchema)
