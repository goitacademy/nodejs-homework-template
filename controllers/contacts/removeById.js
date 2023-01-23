const { Contact } = require('../../models/contact');
const { HttpError }  = require('../../helpers');

const removeById = async (req, res, next) => {
  try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.json({message: "contact deleted"})
  } catch (error) {
      next(error)
  }
}
module.exports = removeById