// импортируем обьект методов отправки запросов
const contacts = require('../models/contacts')

// для проверки поступающих обьектов на сервер, чтобы соответствовали требованиям
const Joi = require('joi')

// импорт HttpError

const {HttpError} = require("../helpers/index")

// создаем обязательный стандарт передаваемого обьекта
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

const getContacts = async (req, res, next) => {
    try {
      const result = await contacts.listContacts()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }


  const getContact = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await contacts.getContactById(id);
      if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
  };

  const addNewContact = async (req, res) => {
    try {
      const { error } = contactSchema.validate(req.body)
      if (error) {
        const errorMessage = error.details[0].message.replace(/['"]/g, '')
        let missingField = ''
  
        if (errorMessage.includes('name')) {
          missingField = 'name'
        } else if (errorMessage.includes('email')) {
          missingField = 'email'
        } else if (errorMessage.includes('phone')) {
          missingField = 'phone'
        }
  
        return res
          .status(400)
          .json({ message: `missing required ${missingField} field` })
      }
  
      const newContact = await contacts.addContact(req.body)
      res.status(201).json(newContact)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  const deleteContact =  async (req, res) => {
    try {
      const { id } = req.params
      const result = await contacts.removeContact(id)
      if (!result) {
        throw HttpError(404, 'Not found');
      }
  
      res.status(200).json({ message: 'Contact deleted' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
  }

  const addChangeContact = async (req, res) => {
    try {
      const { id } = req.params
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'missing fields' })
      }
  
      const { error } = contactSchema.validate(req.body)
      if (error) {
        const errorMessage = error.details[0].message.replace(/['"]/g, '')
        let missingField = ''
  
        if (errorMessage.includes('name')) {
          missingField = 'name'
        } else if (errorMessage.includes('email')) {
          missingField = 'email'
        } else if (errorMessage.includes('phone')) {
          missingField = 'phone'
        }
  
        return res
          .status(400)
          .json({ message: `missing required ${missingField} field` })
      }
  
      const updatedContact = await contacts.updateContact(id, req.body)
      if (!updatedContact) {
        throw HttpError(404, 'Not found');
      }
  
      res.json(updatedContact)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
  }

  module.exports = {
    getContacts,
    getContact,
    addNewContact,
    deleteContact,
    addChangeContact

  }