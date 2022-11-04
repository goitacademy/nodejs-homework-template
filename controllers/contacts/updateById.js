const { Contact } = require('../../models/contact');
const { requestError } = require('../../helpers');

const updateById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    {
      contactId,
      owner: _id,
    },
    req.body,
    {
      new: true,
      timestamps: { createdAt: false, updatedAt: true },
    }
  );

  if (!result) {
    throw requestError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = updateById;
