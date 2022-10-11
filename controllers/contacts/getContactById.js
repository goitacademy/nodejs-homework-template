// @ GET /api/contacts/:id
// не отримує body
// отримує параметр id
// викликає функцію getById для работи з json-файлом contacts.json
// якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
// якщо такого id немає, повертає json з ключем "message": "Not found" i статусом 404


const { basedir } = global;

const service = require(`${basedir}/services`);

const { createError } = require(`${basedir}/helpers`);

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await service.getById(id);

    if (!result) {
        throw createError(404);
    }

    return res.json({
        status: 'Success',
        code: 200, 
        message: 'Contact found',
        data: {
            result,
        },
    });
};

module.exports = getContactById;