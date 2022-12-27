const { getContactById } = require('../../service');

const getContactController = async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  console.log(data);
  if (!data) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(data);
};

module.exports = getContactController;
