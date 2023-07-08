const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

const getContactById = async (req, res) => {
    const id = req.params.contactId;
    const contactById = await Contact.findById(id);
    if (!contactById) {
      throw HttpError(404, 'Not found');
    }
    res.json(contactById);
  };

module.exports = getContactById;