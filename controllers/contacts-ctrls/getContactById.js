const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);

};

module.exports = getContactById;