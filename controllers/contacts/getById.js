const Contact = require("../../models/contacts");
const (RequestError) = require("../../helpers");

const getById = async (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const contactById = await Contact.findById(contactId);
        if(!contactById){
            throw RequestError(404, "Not found");
        }
        res.json(contactById);
    } catch (error) {
        next(error);
    }
}

module.exports = getById;