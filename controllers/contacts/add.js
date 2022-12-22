/* eslint-disable linebreak-style */
const services = require('../../services.js/contacts');

const add = async (req, res, next) => {
  try {
    const {body} = req;
    const result = await services.add(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
};

module.exports = {add};
