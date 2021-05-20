const contacts = [
  {
    id: "6078b70a8ad3ab41843877e3",
    _id: "6078b70a8ad3ab41843877e3",
    name: "Dude",
    email: "Dude@scelerisquescelerisquedui.net",
    phone: "(435) 344-2688",
    password: "password",
    // owner: "607717344ea62d3244ad113a",
    createdAt: "2021-04-15T21:58:34.611Z",
    updatedAt: "2021-04-15T21:58:34.611Z",
  },
  {
    id: "608720b609a09914684fc62a",
    _id: "608720b609a09914684fc62a",
    name: "test1",
    email: "test1@vestibul.co.uk",
    phone: "(777) 222-5555",
    // owner: "607717344ea62d3244ad113a",
    createdAt: "2021-04-26T20:21:10.797Z",
    updatedAt: "2021-04-26T20:21:10.797Z",
  },
];

const newContact = {
  name: "new",
  email: "new@vestibul.co.uk",
  phone: "(777) 222-5555",
  favorite: "false",
};

const User = {
  _id: "60904db6039f7d2558890db3",
  id: "60904db6039f7d2558890db3",
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTA0ZGI2MDM5ZjdkMjU1ODg5MGRiMyIsImlhdCI6MTYyMDM0MDE0MywiZXhwIjoxNjIwNDQ4MTQzfQ.6XBBYXqQSl8Rs0wMyaGEdJitUVfuBdQjAq1erUlMIAM",
  email: "biggermir@gmail.com",
  password: "$2a$08$KLlr3EtrpxNgG9Py/sHi8uoZdWd7ZwAwiar073EVBr3LOLN/j4ISi",
  avatar:
    "60904db6039f7d2558890db3\\1620430062705-8125-1231032781-ironman_close_facesm.jpg",
  createdAt: "2021-05-03T19:23:34.874Z",
  updatedAt: "2021-05-07T23:27:43.203Z",
  idCloudAvatar: null,
};

const users = [];
users[0] = User;

const newUser = { email: "test@test.com", password: "123456" };

module.exports = { contacts, newContact, User, users, newUser };
