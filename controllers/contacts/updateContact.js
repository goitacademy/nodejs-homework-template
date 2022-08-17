// @ PUT /api/contacts/:id
// отримує параметр id
// отримує body у json-форматі з оновленням будь-яких полів name, email і phone
// якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
// якщо з body все добре, викликає функцію updateContact(contactId, body) (напиши її) для оновлення контакту у файлі contacts.json
// за результатом работи функції, повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" и статусом 404


const { basedir } = global;

const service = require(`${basedir}/services/contacts`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/helpers`);

const updateContact = async (req, res) => {
    const { error } = schemas.add.validate(req.body);

    if (error) {
        throw createError(404, 'Missing fields');
    }

    const { id } = req.params;
    const result = await service.update(id, req.body);

    if (!result) {
        throw createError(404);
    }
        
    return res.json({
        status: 'Success',
        code: 200,
        message: 'Contacts updated',
        data: {
            result,
        },
    });
};

module.exports = updateContact;