// @ PATCH /api/contacts/:id/favorite
// отримує параметр contactId
// отримує body в json-форматі з оновленням поля favorite
// якщо body немає, повертає json з ключем {"message": "missing field favorite"} і статусом 400
// якщо з body все добре, викликає функцію updateStatusContact(contactId, body) (напиши її) для оновлення контакту в базі
// за результатом работи функції, повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404


const { basedir } = global;

const service = require(`${basedir}/services`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/helpers`);

const updateStatusContact = async (req, res) => {
    const { error } = schemas.favoriteSchema.validate(req.body);

    if (error) {
        throw createError(404, 'Missing field favorite');
    }

    const { id } = req.params;
    const result = await service.updateStatus(id, req.body);

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
module.exports = updateStatusContact;