const data = require('../../contactsData');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const deletedContact = await data.removeContact(contactId);
 
    if (!deletedContact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }

    res.status(200).json({
      "message": "contact deleted",
      deletedContact
    })
  }
  catch (error) {
    next(error)
  }
}

module.exports = removeContact
