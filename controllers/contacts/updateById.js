const { Contact } = require("../../models/contact");
const {HttpError, ctrlWrapper} = require("../../helpers/index");


const updateById = async (req, res) => {
  const { contactId } = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
  // const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!result) {
    throw HttpError(404, "Contact was not found");
  };

  res.status(200).send(result);
};


module.exports = {
  updateById: ctrlWrapper(updateById)
};