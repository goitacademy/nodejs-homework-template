const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log(contactId);
  console.log(favorite);

  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (data) {
    res.status(200).json({ data });
  } else {
    throw NotFound(`Contact with id=${req.params.contactId} not found`);
  }
};

module.exports = patchContact;
