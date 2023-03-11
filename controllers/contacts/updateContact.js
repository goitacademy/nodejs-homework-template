const { NotFound } = require("http-errors");

const { Contact } = require ("../../models");

const updateContact = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if (!result) {
            throw new NotFound(`Contact with id=${id} not found`);
        }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updateContact;