const messageStatusCode = {
  404: { message: 'Not found' },
  400: {
    missing_required: { message: 'missing required  field' },
    missing_fields: { message: 'missing fields' },
  },
  200: { message: 'contact deleted' },
  500: { message: 'Unknown error' },
  403: { message: 'user already exists' },
};

module.exports = messageStatusCode;
