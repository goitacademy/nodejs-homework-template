const contacts = [
  {
    _id: '5eb074232c30a1378dacdbda',
    name: 'Allen',
    email: 'nulla@vestibul.com',
    phone: '(992) 914-3792',
    subscription: 'free',
    password: '12345',
  },
  {
    _id: '5eb074232c30a1378dacdbdb',
    name: 'Chaim',
    email: 'dui.in@egetlacus.com',
    phone: '(294) 840-6685',
    subscription: 'pro',
    password: '67890',
  },
];

const newContact = {
  name: 'Ivan',
  email: 'Ivan@gmail.com',
  phone: '(050) 555-5555',
};

const User = {
  _id: '6056497473d86226f8d8a5e2',
  name: 'TEST',
  subscription: 'free',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTY0OTc0NzNkODYyMjZmOGQ4YTVlMiIsImlhdCI6MTYxNjI2NzY4MCwiZXhwIjoxNjE2MzEwODgwfQ.xNIDHpNCOADIa0b6SS8eMy1KqQXTZuX1dP2OoEG7T5g',
  email: 'test6@gmail.com',
  password: '$2a$08$gyeqx6vj6jLmlUxpMBI3bO8WbuCGhVl9Rzu68qLB0F8aO9fmvh8J6',
  avatarURL:
    'https://s.gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd?size=250&d=robohash',
  //   createdAt: ISODate('2021-03-20T13:36:17.647Z'),
  //   updatedAt: ISODate('2021-03-20T13:36:17.647Z'),
};

const users = [];
users[0] = User;

const newUser = { email: 'test@test.com', password: '1234561111' };

module.exports = { contacts, newContact, User, users, newUser };
