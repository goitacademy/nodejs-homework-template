const contacts = [
  {
    _id :"6091c101d8572541e78bda4e",
    isFavorite : false,
    features : [],
    name : "Contact Nine",
    email : "contact-9@mail.com",
    phone : "321654987",
    owner : "6091311864f43f308dd763d0",
    createdAt : "2021-05-04T21:47:45.660Z",
    updatedAt : "2021-05-04T21:47:45.660Z"
},

{
    _id : "609187daacbf41393ded4875",
    features : [],
    name : "Contact Seven",
    email : "contact-7@mail.com",
    phone : "321789456",
    owner : "6091311864f43f308dd763d0",
    createdAt : "2021-05-04T17:43:54.715Z",
    updatedAt : "2021-05-04T17:48:09.158Z"
}
]

const newContact = {
  name:'new',
  email: 'new@mail.com',
  phone: '0000000000',
}


const User =
{
  _id: "6091311864f43f308dd763d0",
  id: "6091311864f43f308dd763d0",
  gender: 'male',
  email: "owner-1@test2.com",
  password: "$2a$06$JRhjl4cYQDMSFwJ7EglLZeCjNoDvy2xGXumi0zlguegsVI38nHmRi",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTEzMTE4NjRmNDNmMzA4ZGQ3NjNkMCIsImlhdCI6MTYyMDUxNDMyMSwiZXhwIjoxNjIwNTE3OTIxfQ.mmNrhEEaxYp9_EXwsQQZ3RTf3Yn5qAX133spEB6YnU4",
  updatedAt: "2021-05-08T22:56:32.044Z",
  avatarUrl: "https://res.cloudinary.com/goitnode/image/upload/v1620514591/avatars/avatars/nnpqruzjrb4vozagg48b.jpg",
  // idCloudAvatar : "avatars/avatars/nnpqruzjrb4vozagg48b"
  idCloudAvatar: null
}

const users = []
users[0] = User;

const newUser = {email:'testUser@mail.com', password:'999'}

module.exports = {contacts, newContact, User, users, newUser}