const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");
// const {ValidateId} = require("../../middlewares")

 const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "Not founded")
    }
    res.json(result)

 }

 module.exports = updateContact