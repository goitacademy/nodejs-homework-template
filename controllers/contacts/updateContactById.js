const { Contact } = require("../../models/contact");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const update = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    // console.log(update);
    if (!update) {
      return res.status(400).json({
        "message": "Not found"
      })
    }
    res.json({
      update
    })
  }
  catch(error) {
    next(error)
  }
}

module.exports = updateContactById;