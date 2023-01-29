const { Contact } = require("../../models/contacts");


const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json({
    status: 'success',
    code: 200,
    data: { result: result },
  });
};


module.exports = getAll;