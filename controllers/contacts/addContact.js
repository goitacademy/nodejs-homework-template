
const contactsOperations = require("../../models/contacts");



// схема для валидации полей добавления


const addContact =  async (req, res, next) => {
    try {
        // const {error} = schema.validate(req.body);
        // if (error) {
        //     throw createError(400, "missing required name field");
        // }

        const result = await contactsOperations.addContact(req.body);

        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports =addContact;