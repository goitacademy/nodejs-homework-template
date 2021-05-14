const contacts = [
    {
        _id: '609dd37c026e475af87840fe',
        name: 'Sergey',
        email: 'Sergey@ukr.net',
        phone: '067-821-19-00',
        favorite: false,
    },
    {
        _id: '609dd41a026e475af87840ff',
        name: 'Denis',
        email: 'Denis@ukr.net',
        phone: '067-821-19-00',
        favorite: false,
    }
]

const newContact = {
        name: 'New',
        email: 'newcontact@ukr.net',
        phone: '(000) 1111-1111',
        favorite: false,
}

const User = {
    _id: '60916241e5eb327b40d670e5',
    id: '60916241e5eb327b40d670e5',
    subscription: 'starter',
    name: 'Guest',
    token: null,
    email: 'test77@ukr.net',
    password: '$2a$06$wwHDKVO.X33kzijdlSsGbucevLakHD1InJwzKaOlBAtK6hJ8m/Lz.',
    avatar: 'avatars/1620955714719-c7cc5c537a571ae3f65bc18e87c3fdd6_XL.jpg',
    createdAt: '2021-05-04T15:03:29.659+00:00',
    updatedAt: '2021-05-14T01:28:35.133+00:00',
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }
