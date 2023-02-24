const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');
const setFavorite = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (user.id !== id) {
    throw HttpError({
      status: 403,
      message: "You can't update contact that doesn't belong to your account",
    });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError({ status: 400, message: 'Status were not updated' });
  }
  res.json(
    HttpSuccess({
      data: result,
      message: 'Contact updated',
    })
  );
};
module.exports = setFavorite;
