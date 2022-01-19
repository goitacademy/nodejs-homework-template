const User = {
  _id: '604160bf244710506826c5bc',
  subscription: 'pro',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9.eyJpZCI6IjYwNDE2MGJmMjQ0NzEwNTA2ODI2YzViYyIsMildCI6MTYxNTU0Mjg3MysiaZXhwJinxNjE1NTUwMDazeQ._3Q9Q9eoRIPn40B6ha-_Eybvp9GvZb1muv3BPiGStf4',
  email: 'example@example.com',
  password: '$2a$08$okH6376YlemP1aDx3eJkuE6NoiQNWSXs66Mul0RQr1lrAR9S4pMi',
  avatarURL: '604160bf244710506826c5bc\\5a378c5640e639.6545464915135898462658-default.png',
};

const users = [];
users[0] = User;

const newUser = { email: 'test@test.com', password: '1234567' };

const contacts = [
  {
    _id: '60423455265ddc184c7cb839',
    subscription: 'free',
    name: 'Liliia',
    email: 'lilka8069@gmail.com',
    phone: '(066) 944-4125',
    owner: '604160bf244710506826c5bc',
  },
  {
    _id: '6042346b265ddc184c7cb83b',
    subscription: 'pro',
    name: 'Simon',
    email: 'simon@gmail.com',
    phone: '(095) 159-1568',
    owner: '604160bf244710506826c5bc',
  },
];

const newContact = {
  name: 'Paul',
  email: 'paul@gmail.com',
  phone: '(066) 952-1648',
  subscription: 'premium',
};

module.exports = { User, users, newUser, contacts, newContact };