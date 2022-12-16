const service = require('../../services');

const remove = async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await service.removeContact({ id: req.params.id, owner: id });
    if (data) {
      res.status(200).json({ message: 'contact deleted' });
      return;
    }
    throw new Error('Not found');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = remove;
