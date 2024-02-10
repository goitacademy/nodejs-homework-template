const getInfo = async (req, res, next) => {
  res.json(req.user);
};

module.exports = getInfo;
