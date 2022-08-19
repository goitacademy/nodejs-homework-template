const {basedir} = global

const { Contact } = require(`${basedir}/models`);

const { createError } = require(`${basedir}/helpers`);

const updateStatusFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {
    new: true,
  });
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusFavorite;
