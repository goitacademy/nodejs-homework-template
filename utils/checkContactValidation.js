const checkContactValidation = (req, res) => {
  const { name, phone, email } = req.body;
  if (!name) {
    return res.json({
      status: "error",
      code: 400,
      message: `Ooops! You missing required name field`,
    });
  } else if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: `Ooops! You missing required email field`,
    });
  } else if (!phone) {
    return res.json({
      status: "error",
      code: 400,
      message: `Ooops! You missing required phone field`,
    });
  }
};

module.exports = checkContactValidation;

