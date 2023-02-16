const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  const { authorization = '' } = req.headers;
  const [_, token] = authorization.split(' ');
  console.log(_);
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
        subscription,
        Bearer: token,
      },
    },
  });
};

module.exports = getCurrent;
