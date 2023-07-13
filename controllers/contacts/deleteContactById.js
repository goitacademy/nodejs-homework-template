const { Contact } = require('../../models/contact')
const { HttpError, ctrlWrapper } = require('../../helpers');

// Видалення контакту
const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found"); // якщо немає контакту з таким id
    }
    res.json({message:"Contact deleted"}); 
}

module.exports = {
    deleteContactById: ctrlWrapper(deleteContactById),
}