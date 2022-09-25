const contactsOperation = require('../../models/contacts');
const createError = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    // ------- 1
    // const msgError = JSON.stringify({
    //   status: 'error',
    //   code: 404,
    //   message: `contact with id ${contactId} not found`,
    // });

    // const error = new Error(msgError);
    // error.status = 404;
    // throw error;
    // ----------
    throw createError(404, `contact with id ${contactId} not found`);

    // Подскажите, как в new Error передать объект как в примере ниже
    // ====================== 2

    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `contact with id ${contactId} not found`,
    // });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
