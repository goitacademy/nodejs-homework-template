// contacts.js (модуль з функціями для роботи з контактами)

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Додайте інші поля контакту
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Оголошена змінна Contact
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;



