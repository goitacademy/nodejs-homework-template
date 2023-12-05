const { Contact } = require("../../models/contact");
const {HttpError, ctrlWrapper} = require("../../helpers/index");


const getById = async (req, res) => {
  const {contactId} = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  // const result = await Contact.findById(contactId);


  if(!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).send(result);
};


module.exports = {
  getById: ctrlWrapper(getById)
};