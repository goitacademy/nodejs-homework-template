const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const getById = async (req, res, next) => {
  // try {
  const { contactId } = req.params;
  const result = await contactOperations.getContactById(contactId);

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
    // const error = new Error(`Product with id=${contactId} not found`);
    // error.status = 404;
    // throw error;
    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Product with id=${contactId} not found`,
    // });
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
  // } catch (error) {
  //   next(error);
  //   // res.status(500).json({
  //   //   status: 'error',
  //   //   code: 500,
  //   //   message: 'server error',
  //   // });
  // }
};

module.exports = getById;
