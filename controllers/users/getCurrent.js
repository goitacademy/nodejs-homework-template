const getCurrent = async (req, res) => {
  console.log(req.user);
  const { name, email } = req.user;
  res.json({
    status: "succsess",
    cod: 200,
    data: {
      user: { name, email },
    },
  });
};

module.exports = getCurrent;
