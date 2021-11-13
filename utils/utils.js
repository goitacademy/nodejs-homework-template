module.exports = {
  trimData: data => {
    for (let key in data) {
      data[key] = data[key].trim();
    }
  },
  checkBodyValidation: (req, validator) => {
    const body = req.body;

    validator.isValid(body).then(valid => {
      !valid && res.status(400).json({ message: 'Request is not valid' });
    });
  },
};
