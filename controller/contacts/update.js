const service = require('../../services');

const Joi = require('joi');

const update = async (req, res, next) => {
  const owner = req.user.id;
  const { id } = req.params;
  const body = req.body;

  try {
    if (Joi.object().keys(body).length === 0) {
      res.status(400).json({ message: 'missing fields' });
      return;
    }

    const putContact = await service.updateContact({ id, body, owner });
    res.status(200).json(putContact);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      res.status(400).json({ message: `Not found this id: ${id}` });
      return;
    }

    res.status(404).json({ message: error.message });
  }
};

module.exports = update;
