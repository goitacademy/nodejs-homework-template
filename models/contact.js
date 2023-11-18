const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;

/* Крок 5

У нас з'явилося в контактах додаткове поле статусу favorite, яке приймає логічне значення true або false. Воно відповідає за те, що в обраному чи ні знаходиться зазначений контакт. Потрібно реалізувати для оновлення статусу контакту новий роутер

@ PATCH / api / contacts /: contactId / favorite

Отримує параметр contactId
Отримує body в json-форматі c оновленням поля favorite
Якщо body немає, повертає json з ключем {"message": "missing field favorite"}і статусом 400
Якщо з body все добре, викликає функцію updateStatusContact (contactId, body) (напиши її) для поновлення контакту в базі
За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404 */
