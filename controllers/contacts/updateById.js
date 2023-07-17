const {Contact} = require("../../models/contact");
const {RequestError} = requi

const updateById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if(!result) {
        throw RequestError(404, "Not found");
    }
    res.json(result);
  }
  module.exports = updateById;