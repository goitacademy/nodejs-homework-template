// const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const updateById = async(req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
        // throw new NotFound(`Product with id=${contactId} not found`);
        const error = new Error("Not found");
            error.status = 404;
            
            res.status(404).json({
                message: `Product with id=${contactId} not found`
            });
        return;
    };
     res.json({
        status: "success",
        code: 200,
        data: result
    })
};

module.exports = updateById;