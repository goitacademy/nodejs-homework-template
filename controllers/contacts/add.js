const contactOperation = require("../../models/contacts");
const {schema} = require("../../schemas/contacts");

const add = async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing required name field";
            throw error;
        }
        const result = await contactOperation.addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = add;