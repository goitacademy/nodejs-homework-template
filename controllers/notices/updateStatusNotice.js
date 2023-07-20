const fs = require('fs/promises');
const { contactsValiadationFavorite } = require('../../valiadators/joiValiadator');
const Contact = require('../../models/notices/notises');

const updateStatusContact = async (req, res) => {
  try {
    const { error, value } = contactsValiadationFavorite(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const item = await Contact.findOneAndUpdate({favorite: req.body.favorite });
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(201).json({ message: 'Contact is updated', item });
  }
  catch (err) {
    res.status(400).json({ message: 'Ooops...',})
  }
}
  
  
module.exports = {

  updateStatusContact
}