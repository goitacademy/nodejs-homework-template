/* eslint-disable linebreak-style */
const services = require('../../services.js/contacts');

const get = async (req, res, next) => {
  try {
    const result = await services.get();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {get};
