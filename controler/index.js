const Joi = require('joi'); // метод валадації сталих виразів
const Contact = require("../models/Contact") // підключення до БД через Contact.js
const { HttpError } = require('../helpers'); // обробка помилок

// валідація запиту по схемі joi
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phonePattern).required(),
  favorite: Joi.boolean().optional()
});

// обробка запитів 
const getAllContacts = async (req, res, next) => {
    try {
      const result = await Contact.find();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

const getContactById =  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

const newContact =  async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
  
      if (error) {
        let name_error = '';
  
        if (error.details && error.details.length > 0) {
          name_error = error.details[0].path[0];
        }
  
        if (name_error === 'phone') {
          throw HttpError(400, `Not a pthone field  format. Format:(000) 000-0000`);
        } else {
          throw HttpError(400, `missing required ${name_error} field`);
        }
      }
  
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

const deleteContact = async (req, res, next) => {
  try {
     const { contactId } = req.params;
    // отримання імʼя контаксту перед видаленням
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw HttpError(404, 'Not found')
    }
    const nameForMessange = contact.name

    const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json({ message: `contact ${nameForMessange} deleted` });
    } catch (error) {
      next(error);
    }
  }

const updatedContactById = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw HttpError(400, 'missing fields');
      }
  
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, `Missing required ${error.details[0].path[0]} field`);
      }
  
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        throw HttpError(404, 'Not found');
      }
  
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

const favoritStatus = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { favorite } = req.body;
  
      // Перевірка наявності поля "favorite" в запиті
      if (favorite === undefined) {
        return res.status(400).json({ message: 'Missing field "favorite"' });
      }
  
      // Виклик функції updateStatusContact для оновлення статусу у базі
      const updatedContact = await updateStatusContact(contactId, { favorite });
  
      // Перевірка наявності оновленого контакту
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }


module.exports = {
    getAllContacts,
    getContactById,
    newContact,
    deleteContact,
    updatedContactById,
    favoritStatus
}

// Функція для оновлення статусу контакту
async function updateStatusContact(contactId, updateFields) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: updateFields },
        { new: true }
      );
  
      return updatedContact;
    } catch (error) {
      throw new HttpError(500, 'Internal Server Error');
    }
  }