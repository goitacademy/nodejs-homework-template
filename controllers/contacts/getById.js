const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/utils`);

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getById;
