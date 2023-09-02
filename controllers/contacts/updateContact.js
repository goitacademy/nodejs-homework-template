const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../helpers');

const updateContact = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
});

    if (!result) {
    throw httpError(404, 'Not found');
}

    return res.json(result);
};

module.exports = ctrlWrapper(updateContact);