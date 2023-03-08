const {Contact} = require("../../models/contact")

const {RequestError} = require("../../helpers")

const removeContactById = async(req, res)=> {
    const {id} = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeContactById;