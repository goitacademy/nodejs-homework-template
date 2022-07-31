const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner, favorite }, '-createdAt -updatedAt', { skip, limit: Number(limit) })
    .populate('owner', 'email subscription');
  res.json(result)
}

module.exports = getAllContacts;