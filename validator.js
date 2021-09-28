const yup = require("yup");
const createContactSchema = yup.object().shape({
  name: yup.string().required({ message: "missing required name field" }),
  email: yup
    .string()
    .email()
    .required({ message: "missing required name field" }),
  phone: yup.string().required({ message: "missing required name field" }),
});
const putContactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
});
const validatePost = () => async (req, res, next) => {
  try {
    await createContactSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const validatePut = () => async (req, res, next) => {
  try {
    await putContactSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = {
  validatePost,
  validatePut,
};
