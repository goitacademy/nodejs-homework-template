const { NotFound } = require("http-errors");

const {Contact} = require('../../models');

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw NotFound(`Contact with id=${id} not found`);
    }
    res.json(result)
}

module.exports = updateFavorite;