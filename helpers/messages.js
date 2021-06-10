const { HttpCodes } = require('./constants');

const ResourseNotFoundMessage = { status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' };

const ResponseMessages = {
  created: 'New contact was created.',
  deleted: 'Contact deleted.',
  updated: 'Contact updated.',
  statusUpdated: "Contact's status updated."
};

module.exports = { ResourseNotFoundMessage, ResponseMessages };
