const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts")

const removeById = async(req, res)=> {
    const {contactId} = req.params;
    const result = await contacts.removeById(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeById;