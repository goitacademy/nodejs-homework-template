const yup = require("yup");

const validationSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(14).required(),
});

module.exports = validationSchema;
