// @ DELETE /api/contacts/:id
// не отримує body
// отримує параметр id
// викликає функцію removeContact для работи с json-файлом contacts.json
// якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
// якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404


const { basedir } = global;

const service = require(`${basedir}/services`);

const { createError } = require(`${basedir}/helpers`);

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await service.remove(id);

    if (!result) {
        throw createError(404);
    }

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact deleted',
        data: {
            result,
        },
    });
};

module.exports = removeContact;