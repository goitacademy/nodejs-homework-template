const { Contact } = require('../../models/contact');
const { HttpError }  = require('../../helpers');

const updateById = async (req, res, next) => {
  try {    
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.json(result)

  } catch (error) {
      next(error)
  }
}
module.exports = updateById