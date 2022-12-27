const { updateContactStatus } = require('../../service');
const { updateContactStatusSchema } = require('../../utils');

const updateContactStatusController = async (req, res, next) => {
  const { error } = await updateContactStatusSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing field favorite',
    });
    return;
  }

  const data = await updateContactStatus(req.params.contactId, req.body);
  if (!data) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.status(201).json(data);
};

module.exports = updateContactStatusController;
