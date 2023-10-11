// contacts.js (модуль з функціями для роботи з контактами)

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Додайте інші поля контакту
  name: String, 
  phone: String, 

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Посилання на колекцію користувачів
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;




