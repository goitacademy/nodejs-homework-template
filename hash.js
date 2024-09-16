const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.getSalt(10);

  const result = await bcrypt.hash(password, 10);
};

hashPassword(12345);
