const { Contact } = require('../../models/contact')
const { HttpError, ctrlWrapper } = require('../../helpers');

// Редагування контакту
const updateContactById = async (req, res) => {
    const {contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}); // якщо не написати {new: true}, то повернеться стара версія об'єкта
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json(result); 
}

module.exports = {
    updateContactById: ctrlWrapper(updateContactById),
}