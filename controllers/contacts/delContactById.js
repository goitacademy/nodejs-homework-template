const { Contact } = require("../../models/contact");

const delContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContactById = await Contact.findByIdAndDelete(contactId);
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