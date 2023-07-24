const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts")

const updateById = async(req, res)=> {
    const {contactId} = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.status(201).json(result)
}

module.exports = updateById;