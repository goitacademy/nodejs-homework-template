const { NotFound } = require("http-errors");

const contactsOperations = require("../../model/contacts");

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.getById(id);
    if (!result) {
        throw new NotFound(`Contacts with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getById;