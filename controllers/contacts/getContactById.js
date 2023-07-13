const { Contact } = require('../../models/contact')
const { HttpError, ctrlWrapper } = require('../../helpers');

// Отримання контакту по id
const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result);
}

module.exports = {
    getContactById: ctrlWrapper(getContactById),
}