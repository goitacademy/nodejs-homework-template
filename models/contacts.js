const Contact = require('../schemas/contacts')
const handleError = require('../helpers/handleError')

/**
 * Витягує всі контакти з БД
 * @returns {Promise<Array>} масив усіх контактів
 */
const listContacts = async () => {
  return await handleError(async () => {
    const data = await Contact.find({})

    return data
  })
}

/**
 * Отримує контакти за вказаним id
 * @param {string}  contactId - Ідентифікатор контакту
 * @returns {Promise<Object|null>} - Повертає контакт за вказаним id, або null якщо не знайде
 */
const getContactById = async contactId => {
  return handleError(async () => {
    const contacts = await Contact.findOne({ _id: contactId })

    return contacts
  })
}

/**
 * Видаляє контакт за вказаним id
 * @param {string} contactId  
 * @returns {Promise<Object|null>} - Видалений контакт або null, якщо не знайдено
 */
const removeContact = async (contactId) => {
  return handleError(async () => {
    const contacts = await Contact.findByIdAndRemove({
      _id: contactId,
    })

    return contacts
  })
}

/**
 * Отримує дані про контакт у вигляді об'єкта body
 * Додає контакт до БД
 * @param {Object} body - Дані контакту у вигляді об'єкта  
 * @returns {Promise<Object>} - Доданий контакт
 */
const addContact = async (body) => {
  return handleError(async () => {
    const contacts = await Contact.create(body)

    return contacts
  })
}

/**
 * Оновлює контакт в БД
 * @param {string} contactId  
 * @param {Object} body - Оновлені дані контакту
 * @returns {Promise<Object|null} - Оновлений контакт або null, якщо не знайдено
 */
const updateContact = async (contactId, body) => {
  return await handleError(async () => {
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )

    return contact
  })
}

/**
 * Оновлює статус контакту в БД
 * @param {string} contactId 
 * @param {Object} body - Новий статус контакту
 * @returns {Promise<Object|null>} - Оновлений контакт або null, якщо не знайдено
 */
const updateStatusContact = async (contactId, body) => {
  return await handleError(async () => {
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )

    return contact
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
