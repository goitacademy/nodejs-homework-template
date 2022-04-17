const { Contact } = require('../../models');

const putContact = async (req, res, next) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new:true});

  if (!updatedContact) {
    res.status(404).json({ status: "error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 200, payload: updatedContact });
}

module.exports = putContact;