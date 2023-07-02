const { contact } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const resolt = await contact.findByIdAndDelete(contactId);
    if(!resolt){
      throw HttpError({status: 404, message:"Not found"});
    }
    res.json({ message: "contact deleted" })
}

module.exports = deleteById;