// @ PUT /api/contacts/:id
// отримує параметр id
// отримує body у json-форматі з оновленням будь-яких полів name, email і phone
// якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
// якщо з body все добре, викликає функцію updateContact(contactId, body) (напиши її) для оновлення контакту у файлі contacts.json
// за результатом работи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" и статусом 404


const contacts = require('../../models/contacts');

const { contactSchema } = require('../../schemas/contacts');

const { createError } = require('../../helpers/createError');

const updateContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);

        if (error) {
            throw createError(404, 'Missing fields');
        }

        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);

        if (!result) {
            throw createError(404);
        }
        
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = updateContact;