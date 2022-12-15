const service = require('../../services');

const getById = async (req, res, next) => {
  const { id } = req.user;
  try {
    const contact = await service.getByIdContact({
      id: req.params.id,
      owner: id,
    });
    if (contact) {
      res.status(200).json(contact);
      return;
    }
    throw new Error('Not found');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getById;
