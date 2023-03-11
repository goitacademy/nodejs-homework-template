const { NotFound } = require("http-errors");
const { Contact } = require ("../../models");

const getById = async (req, res) => {
        const { id } = req.params;
    const result = await Contact.findById(id);
        if (!result) {
            throw new NotFound(`Contact with id=${id} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
};

module.exports = getById;