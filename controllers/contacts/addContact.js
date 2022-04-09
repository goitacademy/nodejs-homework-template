const { Contact } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const addContact = async (req, res) => {
  const { body } = req;
  const { _id } = req.user;
  const contact = await Contact.create({ ...body, owner: _id });

  res.status(HTTP_STATUS_CODE.CREATED).json({
    status: STATUS.SUCCESS,
    code: HTTP_STATUS_CODE.CREATED,
    payload: { contact },
  });
};

module.exports = addContact;
