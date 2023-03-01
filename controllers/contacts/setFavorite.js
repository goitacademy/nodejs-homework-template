const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');
const setFavorite = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: { _id: user.id } },
    req.body,
    {
      new: true,
    }
  );
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
