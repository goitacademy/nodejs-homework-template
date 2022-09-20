const contactsOperations = require("../../models/contacts");

const removeById = async(req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    
    if (!result) {
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
        message: "product deleted",
        data: result
    })
};

module.exports = removeById;