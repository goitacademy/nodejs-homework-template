// @ GET /api/contacts/:id
// не отримує body
// отримує параметр id
// викликає функцію getById для работи з json-файлом contacts.json
// якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
// якщо такого id немає, повертає json з ключем "message": "Not found" i статусом 404


const contacts = require('../../models/contacts');

const { createError } = require('../../helpers');

const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.getContactById(id);

        if (result) {
            return res.json({
                status: 'Success',
                code: 200, 
                message: 'Contact found',
                data: {
                    result,
                },
            });
        } else {
            throw createError(404);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = getContactById;