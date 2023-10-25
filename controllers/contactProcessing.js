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

// обробка запитів для роботи з контактами
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
        throw new HttpError(404, 'Не знайдено');
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
          throw new HttpError(400, `Не правильний формат поля phone. Формат:(000) 000-0000`);
        } else {
          throw new HttpError(400, `відсутнє поле ${name_error}`);
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
      throw new HttpError(404, 'Не знайдено')
    }
    const nameForMessange = contact.name

    const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
        throw new HttpError(404, 'Не знайдено');
      }
      res.json({ message: `Контакт ${nameForMessange} видалено` });
    } catch (error) {
      next(error);
    }
  }

const updatedContactById = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new HttpError(400, 'Відсутнє поле');
      }
  
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw new HttpError(400, `Відсутнє обовʼязкове поле ${error.details[0].path[0]}`);
      }
  
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        throw new HttpError(404, 'Не знайдено');
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
        return res.status(400).json({ message: 'Відсутнє поле "favorite"' });
      }
  
      // Виклик функції updateStatusContact для оновлення статусу у базі
      const updatedContact = await updateStatusContact(contactId, { favorite });
  
      // Перевірка наявності оновленого контакту
      if (!updatedContact) {
        return res.status(404).json({ message: 'Не знайдено' });
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
      throw new HttpError(500, 'Внутрішня помилка серверу');
    }
  }