const yup = require('yup');

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string().trim().matches(phoneRegExp, 'Phone number is not valid'),
  id: yup.string(),
});

module.exports = schema;
