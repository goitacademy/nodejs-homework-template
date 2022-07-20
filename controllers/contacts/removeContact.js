// @ DELETE /api/contacts/:id
// не отримує body
// отримує параметр id
// викликає функцію removeContact для работи с json-файлом contacts.json
// якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
// якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404


const contacts = require('../../models/contacts');

const { createError } = require('../../helpers/createError');

const removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.removeContact(id);

        if (result) {
            return res.json({
                status: 'Success',
                code: 200,
                message: 'Contact deleted',
                data: {
                    result,
                },
            });
        } else {
            throw createError(404);
        }
    }catch (error) {
        next(error);
    }
};

module.exports = removeContact;