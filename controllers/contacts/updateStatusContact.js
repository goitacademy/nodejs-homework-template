const { Contact } = require('../../models');
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
 
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
};

module.exports = updateStatusContact;
 