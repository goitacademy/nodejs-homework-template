const service = require('../../services');

const create = async (req, res, next) => {
  const { id } = req.user;
  try {
    const newContact = await service.createContact({ ...req.body, owner: id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = create;
