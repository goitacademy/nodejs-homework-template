import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { validationRequest } from './validationRequest';

const contactsSchema = joi.object({
  limit: validationFields.limit.optional(),
  page: validationFields.page.optional(),
  favorite: validationFields.favorite.optional(),
});

const contactIdSchema = joi.object({
  contactId: validationFields.contactId.required(),
});

const addContactSchema = joi.object({
  name: validationFields.name.required(),
  email: validationFields.email.required(),
  phone: validationFields.phone.required(),
  favorite: validationFields.favorite.optional(),
});

const updateContactSchema = joi
  .object()
  .keys({
    name: validationFields.name.optional(),
    email: validationFields.email.optional(),
    phone: validationFields.phone.optional(),
    favorite: validationFields.favorite.optional(),
  })
  .min(1)
  .messages({ 'object.min': 'You need to add at least one field for changing the contact.' });

const updateFavoriteSchema = joi.object({
  favorite: validationFields.favorite.required(),
});

export default {
  getContacts: validationRequest(contactsSchema, 'query'),
  getContactById: validationRequest(contactIdSchema, 'params'),
  addContact: validationRequest(addContactSchema, 'body'),
  updateContact: validationRequest(updateContactSchema, 'body'),
  updateFavorite: validationRequest(updateFavoriteSchema, 'body'),
};
