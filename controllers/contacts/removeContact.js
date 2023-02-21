const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');
const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError({
      status: 404,
      message: "You can't remove contact which is not exist",
    });
  }
  res.json(
    HttpSuccess({
      data: removeContact.id,
      message: 'Contact deleted',
      code: 204,
    })
  );
};
module.exports = removeContact;
