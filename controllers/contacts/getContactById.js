const contacts = require("../../models/contacts")

const {RequestError} = require("../../helpers")

const getById = async (req, res) => {
    console.log('res', res)
    console.log('req.params', req.params)
    const { contactId } = req.params;
    console.log('contactId', contactId)
    const result = await contacts.getById(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = getById;