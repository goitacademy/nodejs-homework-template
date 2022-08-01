// @ POST /api/contacts
// отримує body у форматі {name, email, phone} (усі поля є обов'язковими)
// якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
// якщо з body все добре, додає унікальний ідентифікатор до об'єкта контакту
// викликає функцію addContact(body) для збереження контакту в файлі contacts.json
// за результатом работи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201


const { basedir } = global;

const service = require(`${basedir}/services`);

const { schemas } = require(`${basedir}/models/contact`);

const { createError } = require(`${basedir}/helpers`);

const addContact = async (req, res) => {
    const { error } = schemas.add.validate(req.body);

    if (error) {
        throw createError(400, 'Missing required name field');
    }
        
    const result = await service.add(req.body);
    
    return res.json({
        status: 'Success',
        code: 201,
        message: 'Request successful. Contact created',
        data: {
            result,
        }    
    });
};

module.exports = addContact;