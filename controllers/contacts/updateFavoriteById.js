var { NotFound, BadRequest } = require('http-errors');

const { Contact } = require('../../models');

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!{ favorite }) {
    throw new BadRequest('missing field favorite');
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );
  if (!result) {
    throw new NotFound(`id ${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavoriteById;
