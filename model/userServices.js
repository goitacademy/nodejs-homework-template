const {
  findUserByIdRepository,
  findUserByEmailRepository,
  createContactRepository,
} = require("../repository/usersRepository");

const createUserService = async (body) => {
  const data = await createContactRepository(body);
  return data;
};

const findUserByEmailService = async (email) => {
  const data = await findUserByEmailRepository(email);
  return data;
};

const findUserByIdService = async (id) => {
  const data = await findUserByIdRepository(id);
  return data;
};

module.exports = {
  createUserService,
  findUserByEmailService,
  findUserByIdService,
};
