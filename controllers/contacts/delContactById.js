const removeContact = require("../../model/contacts/removeContact");

const delContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContactById = await removeContact(contactId);
    if (!removeContactById) {
      return res.status(400).json({
        "message": "Not found"
      })
    }
    res.json({
      removeContactById
    })
  }
  catch(error) {
    next(error)
  }
}

module.exports = delContactById;