const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contacts');

const updateFavorite = async (req, res, next) => {
    const { id } = req.params;
    console.log('id', id);

    const result = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
};

module.exports = updateFavorite;
