const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    console.log(result)
    if (!result) {
        throw RequestError(404, "Not found");
    }

    res.status(200).json({
        message: "contact deleted"
    })
};

module.exports =  removeById;