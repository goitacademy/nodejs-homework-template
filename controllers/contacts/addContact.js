const createError = require("http-errors");
const { contactSchema } = require("../../schemas");
const { contacts: service } = require("../../services");

const addContact = async (req, res) => {
    
    const { error } = contactSchema.validate(req.body);
    if (error) {
        throw createError(400, "Missing required field");
    }
    const result = await service.addContact(req.body);
    
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result,
        },
    });
};

module.exports = addContact;