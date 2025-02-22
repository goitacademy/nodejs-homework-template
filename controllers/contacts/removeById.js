const { RequestError } = require("../../helpers");
const {Contact} = require("../../models/contact")

const removeById = async(req, res)=> {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeById;