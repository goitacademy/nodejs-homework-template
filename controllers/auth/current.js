require("dotenv").config();

const current = async (request, response) => {
  const { email, subscription } = request.user;

  response.json({
    email,
    subscription,
  });
};

module.exports = current;
