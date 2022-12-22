const { Contact } = require("../../models/contact");
const { HttpError } = require('../../helpers');

const updateStatusContact  =  async (req, res, next) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, 'this is update mistakes');
    }

    res.json(result);

}

module.exports = updateStatusContact;