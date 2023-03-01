const { Contact } = require('../../models/index');
const { HttpError } = require('../../helpers');
const removeContact = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (user.id !== id) {
    throw HttpError({
      status: 403,
      message: "You can't remove contact that doesn't belong to your account",
    });
  }
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError({
      status: 404,
      message: "You can't remove contact which is not exist",
    });
  }

  res.statusMessage('Contact deleted').json({
    data: {
      id: removeContact.id,
      message: 'Contact deleted',
      code: 204,
    },
  });
};
module.exports = removeContact;
