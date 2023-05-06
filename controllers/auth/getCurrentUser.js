const getCurrentUser = async (requirement, response) => {
  const { email, subscription } = requirement.user;
  response.json({
    email,
    subscription,
  });
};

module.exports = getCurrentUser;
