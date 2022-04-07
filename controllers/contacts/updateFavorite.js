const { Contact } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const updateFavorite = async (req, res) => {
  if (req.body.favorite === undefined) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_STATUS_CODE.BAD_REQUEST,
      message: "Missing field favorite. {'favorite': boolean }",
      payload: 'Missing field favorite',
    });
  }
  const { favorite = false } = req.body;
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true },
  ).populate('owner', '_id name email');

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
    payload: { favorite },
  });
};

module.exports = updateFavorite;
