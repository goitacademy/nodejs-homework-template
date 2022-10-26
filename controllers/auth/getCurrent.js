const getCurrent = async (res, req) => {
  const { email } = req.user;
  res.json({
    email,
  });
};
module.exports = getCurrent;
