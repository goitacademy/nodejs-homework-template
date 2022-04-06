const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ status: "error", code: 404, message: "Not found"})
  }

  res.json({ status: "success", code: 200, payload: {contact} })
}

module.exports = getContactById;