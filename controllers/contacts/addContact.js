// @ POST /api/contacts
// отримує body у форматі {name, email, phone} (усі поля є обов'язковими)
// якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
// якщо з body все добре, додає унікальний ідентифікатор до об'єкта контакту
// викликає функцію addContact(body) для збереження контакту в файлі contacts.json
// за результатом работи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201


const contacts = require('../../models/contacts');

const { contactSchema } = require('../../schemas/contacts');

const { createError } = require('../../helpers');

const addContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);

        if (error) {
            throw createError(400, 'Missing required name field');
        }
        
        const result = await contacts.addContact(req.body);
        return res.json({
            status: 'Success',
            code: 201,
            message: 'Request successful. Contact created',
            data: {
                result,
            }    
        });
    } catch (error) {
            next(error);
    }
};

module.exports = addContact;