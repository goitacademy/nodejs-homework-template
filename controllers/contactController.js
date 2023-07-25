// импорт HttpError
const { HttpError } = require('../helpers/index')
const { Contact } = require('../models/Contact')

const { contactSchema, updateFavoriteSchema } = require('../schemas/index')

const getContacts = async (req, res, next) => {
  try {
    const result = await Contact.find()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findById(id)
    if (!result) {
      throw new HttpError(404, 'Contact not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

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
    const newContact = await Contact.create(req.body)

    res.status(201).json(newContact)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Contact.findByIdAndDelete(id)

    if (!result) {
      throw HttpError(404, 'Not found')
    }

    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' })
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
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!updatedContact) {
      throw HttpError(404, 'Not found')
    }

    res.json(updatedContact)
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' })
  }
}

// Функция для обновления поля "favorite" контакта в базе данных
const updateStatusContact = async (contactId, body) => {
  // Проверяем наличие поля "favorite" в теле запроса
  if (!body || !Object.prototype.hasOwnProperty.call(body, 'favorite')) {
    return { status: 400, message: 'missing field favorite' }
  }

  // Обновляем поле "favorite" контакта в базе данных
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  )

  // Проверяем, был ли контакт найден и успешно обновлен
  if (!updatedContact) {
    return { status: 404, message: 'Not found' }
  }

  return { status: 200, updatedContact }
}

// Функция для обновления поля "favorite" контакта
const addChangeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params
    // Проверяем, существует ли тело запроса и содержит ли оно поле "favorite"
    if (
      !req.body ||
      !Object.prototype.hasOwnProperty.call(req.body, 'favorite')
    ) {
      return res.status(400).json({ message: 'missing field favorite' })
    }

    // Проверяем соответствие тела запроса схеме
    const { error } = updateFavoriteSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message.replace(/['"]/g, '')
      let missingField = ''

      // Определяем, какое обязательное поле отсутствует в теле запроса
      if (errorMessage.includes('favorite')) {
        missingField = 'favorite'
      }

      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` })
    }

    // Вызываем функцию updateStatusContact для обновления поля "favorite" контакта
    const result = await updateStatusContact(id, req.body)

    // Обрабатываем результат, возвращенный updateStatusContact
    if (result.status === 200) {
      res.json(result.updatedContact)
    } else if (result.status === 404) {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  addChangeContact,
  addChangeFavorite
}
