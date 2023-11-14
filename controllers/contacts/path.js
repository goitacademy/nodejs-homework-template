const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  /*
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });*/
  res.status(200).json({
    message: 'Update status contact',
    result,
  });
};

module.exports = updateStatus;
