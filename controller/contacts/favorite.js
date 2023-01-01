const service = require('../../services');

const favorite = async (req, res) => {
  const owner = req.user.id;
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing field favorite' });
      return;
    }

    const data = await service.updateStatusContact({ id, body, owner });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = favorite;
