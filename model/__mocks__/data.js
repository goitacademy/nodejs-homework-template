const faker = require('faker');

const contacts = [
  {
    _id: '5f837f855ba83a4f1829ca5b',
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    owner: '604780b0a33f593b5866d70d',
  },
  {
    _id: '5f8382425ba83a4f1829ca5c',
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    owner: '604780b0a33f593b5866d70d',
  },
];

const newContact = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  owner: '604780b0a33f593b5866d7wd',
};

const User = {
  email: 'user123@gmail.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg',
  _id: '604780b0a33f593b5866d70d',
  password: '$2a$08$ebkI0zFk0IBoStiDDhyzr.9y0BqToGXPtrcTqcMErEuk4JHHF3K8O',
  updatedAt: '2021-03-10T00:05:44.937Z',
  avatarURL:
    'https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250',
  subscription: 'free',
  imgIdCloud: null,
};

const users = [];
users[0] = User;

const newUser = { email: 'user@gmail.com', password: '1234567ah' };

module.exports = { contacts, newContact, User, users, newUser };
