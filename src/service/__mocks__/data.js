const contacts = [
  {
    id: "1dfshgdfsh",
    name: "Allen Raymond",
    email: "nulla.ante@vestibul.co.uk",
    phone: "(992) 914-3792",
  },
  {
    id: "2fgdsf",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685",
  },
];

const newContact = {
  name: "NEWUSER",
  email: "dima@dfdss.com",
  phone: "(333) 840-6685",
};

const User = {
  email: "test1@gmail.com",
  password: "123456",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2IxMjViN2RhNDYxMTllMDM4YmVkYiIsImlhdCI6MTYxODk5NDUyMSwiZXhwIjoxNjE4OTk4MTIxfQ.K50MIpQ_Qau1wbrdWLvqZXp75QBXi3WIzjXAJjCVUKw",
  _id: "sdjfhioadslfj",
  password: "$2a$06$YOtObzQnQAM11HG7pkC9ie0dqEtclXYh6D4Jo8eUk9L.HHnA9EuBa",
  subscription: "starter",
  idCloudAvatar: "avatars/abnzapdyimlkutkeryzb",
  avatarURL:
    "https://res.cloudinary.com/dimrom-cloud/image/upload/v1618994782/avatars/abnzapdyimlkutkeryzb.jpg",
};

const users = [];
users[0] = User;

const newUser = {
  email: "test3@gmail.com",
  password: "123456",
};

module.exports = { contacts, newContact, User, users, newUser };
