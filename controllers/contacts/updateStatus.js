/* eslint-disable linebreak-style */
const services = require('../../services.js/contacts');

const updateStatus = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {favorite} = req.body;

    const result = await services.update(contactId, {favorite});
    if (result) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          updated: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: 'Not found',
      },
      );
    };
  } catch (error) {
    console.error(error);
    next(error);
  };
};

module.exports = {updateStatus};

