// @ GET /api/contacts
// нічого не отримує
// викликає функцію listContacts для работи с json-файлом contacts.json
// повертає масив усіх контактів у json-форматі зі статусом 200


const contacts = require('../../models/contacts');

const getAllContacts = async (_req, res, next) => {
    try {
        const result = await contacts.listContacts();

        return res.json({
            status: 'Success',
            code: 200,
            message: 'Contacts found',
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllContacts;
