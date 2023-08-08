// const createError = require("http-errors");
// const { contactSchema } = require("../../schemas");
const { contacts: service } = require("../../services");

const addContact = async (req, res) => {
    
    const result = await service.addContact(req.body);
    
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result,
        },
    });
    return result;
};

module.exports = addContact;