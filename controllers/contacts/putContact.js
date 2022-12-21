const Contact = require("../../models/schema");
const { NotFound } = require("http-errors");

const putContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const data = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    if (data) {
      res.status(200).json({ data });
    } else {
      throw NotFound(`Contact with id=${req.params.contactId} not found`);
    }
  }
};

module.exports = putContact;
