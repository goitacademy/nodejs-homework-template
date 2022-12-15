const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} not found`)
    }
    res.json({ message: "Delete success"})
 
}

module.exports = removeContact