const { NotFound } = require("http-errors");

const contactsOperations = require("../../model/contacts");

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.removeById(id);
    if (!result) {
        throw new NotFound(`Contacts with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: "contacts deleted",
        data: {
            result
        }
    })
}

module.exports = removeById;