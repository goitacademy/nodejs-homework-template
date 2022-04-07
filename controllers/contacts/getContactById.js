const { Contact } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId }).populate(
    'owner',
    '_id name email',
  );

  if (!contact) {
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      status: STATUS.ERROR,
      code: HTTP_STATUS_CODE.NOT_FOUND,
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

module.exports = getContactById;
