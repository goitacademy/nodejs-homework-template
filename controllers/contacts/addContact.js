
const contactsOperations = require("../../models/contacts");



// схема для валидации полей добавления


const addContact =  async (req, res, next) => {
    try {
        const result = await contactsOperations.addContact(req.body);

        res.status(201).json({
            data: {
                result: result
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports =addContact;