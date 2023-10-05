const mongoose = require('mongoose');

// Схема моделі для колекції contacts
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

// Створення моделі на основі схеми
const Contact = mongoose.model('Contact', contactSchema);

// Отримання списку контактів
const listContacts = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    throw error;
  }
};

// Отримання контакту за ID
const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw error;
  }
};

// Видалення контакту за ID
const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    throw error;
  }
};

// Додавання нового контакту
const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    throw error;
  }
};

// Оновлення контакту за ID
const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw error;
  }
};

// Оновлення статусу контакту за ID
const updateStatusContact = async (contactId, favorite) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact, // Додайте цю функцію до експорту
};
