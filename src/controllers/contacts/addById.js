const {addContact} = require('../../models/index');

const addById = async (req, res) => {
  try {
    const result = await addContact(req.body);
    return res.status(200).json({
      status: 'created',
      code: 200,
      data: { result },
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }  
};

module.exports = addById;
