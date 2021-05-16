const contacts = [{
    id : "6083f5f80d47e77b16746137",
    _id: "6083f5f80d47e77b16746137",
    name : "Chaim Lewis",
    email : "dui.in@egetlacus.ca",
    phone : "(294) 840-6685",
    favorite : true
},


{
    id : "6083f5f80d47e77b16746138",
    _id: "6083f5f80d47e77b16746138",
    name : "Kennedy Lane",
    email : "mattis.Cras@nonenimMauris.net",
    phone : "(542) 451-7038",
    favorite : false
}
]
const newContact = {
    name: "Genadiy Vasilievich",
    email: "genadiy@imudak.com",
    phone: "(294) 840-6685",
}

const User = {
    id : "609c13cda48e7f2b2aa9c35a",
    _id : "609c13cda48e7f2b2aa9c35a",
    subscription : "starter",
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWMxM2NkYTQ4ZTdmMmIyYWE5YzM1YSIsImlhdCI6MTYyMTAxNDIxOCwiZXhwIjoxNjIxMDIxNDE4fQ.hhqYnvoqxzeCUfKY6-J-Ey9_bhfD1A5T-dmt_l_3VGU",
    email : "test11@test.com",
    password : "$2a$06$JMoUlEqNPrA39rxoPUGxqOzpwIAqFWl8Xt/9Vp7DnbHqxluqgY.0C",
    avatar : "avatars/1621015906123-avatar-2.8a28910d.png",
    createdAt : "2021-05-12T17:43:41.521Z",
    updatedAt : "2021-05-14T18:11:46.316Z"
}

const users = []
users[0] = User
const newUser = { email: 'test12@test.com', password: '123aA123g' }
module.exports = { contacts, newContact, User, users, newUser }