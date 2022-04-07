const { Contact } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: id,
  }).populate('owner', '_id name email');

  if (!contact) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_STATUS_CODE.BAD_REQUEST,
      message: `Not found contact by id:${contactId}`,
      payload: 'Not Found',
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_STATUS_CODE.OK,
    payload: { contact },
  });
};

module.exports = removeContact;
