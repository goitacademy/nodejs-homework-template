// @ GET /api/contacts
// нічого не отримує
// викликаємо функцію getAll для работи с json-файлом (db-contacts)
// повертає масив усіх контактів у json-форматі зі статусом 200 (метод find({}) проп. getAll)


const { basedir } = global;

const service = require(`${basedir}/services`);

const getAllContacts = async (_req, res) => {
    const result = await service.getAll();
    
    return res.json({
        status: 'Success',
        code: 200,
        message: 'Contacts found',
        data: {
            result,
        },
    });
};

module.exports = getAllContacts;
