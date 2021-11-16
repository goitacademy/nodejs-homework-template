const yup = require('yup');

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string().trim().matches(phoneRegExp, 'Phone number is not valid'),
  id: yup.string(),
});

module.exports = {
  schema,
  getContactByIdValidation: (req, res, next) => {
    const id = req.params.contactId;

    schema
      .isValid({
        id,
      })
      .then(valid => {
        !valid && res.status(400).json({ message: 'ID is not valid' });
      });

    next();
  },

  postContactValidation: (req, res, next) => {
    const body = req.body;
    schema.isValid(body).then(valid => {
      !valid && res.status(400).json({ message: 'Request is not valid' });
    });

    next();
  },

  putContactValidation: (req, res, next) => {
    const body = req.body;
    schema.isValid(body).then(valid => {
      !valid && res.status(400).json({ message: 'Request is not valid' });
    });

    next();
  },
};
