# Node-rest-api-server

- [Commands for install and use](#Commands-for-install-and-use)
- [Connect](#Connect-to-your-own-database)
- [SchemeUser](#User-scheme)
- [SchemeContact](#Contact-scheme)
- [CRUD](#CRUD)

## Commands for install and use

This is the example of the simplest CRUD rest-api on NodeJS + Mongoose.

To run:

```
npm install

npm run dev
```

## Connect to your own database

In order to use your database, you need to create an .env file in the project root and write the connection string to your database in the DB_HOST variable and SECRET_KEY variable for encrypt your password.

An example .env file can be viewed in the file .env.example

Connection string in .env file:
DB_HOST=mongodb+srv://<user>:<password>@cluster0.avhnq.mongodb.net/<my_database>?retryWrites=true&w=majority

```
- <my_database> - the database to connect
- <user> - users with read / write access to this database
- <password> - user password
```

## User scheme

The user scheme looks like:

```
const userSchema = new Schema(
{
password: {
type: String,
required: [true, 'Password is required'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
},
subscription: {
type: String,
enum: ['starter', 'pro', 'business'],
default: 'starter',
},
avatarURL: {
type: String,
default: function () {
return gravatar.url(this.email, { s: '250' }, true)
},
},
token: {
type: String,
default: null,
},
},
{ versionKey: false, timestamps: true }
)
```

## Contact scheme

The example contains a CRUD implementation for one contact reference entity.

The contact scheme looks like:

```
const contactSchema = Schema(
{
name: {
type: String,
required: [true, 'Set name for contact'],
},
email: {
type: String,
},
phone: {
type: String,
},
favorite: {
type: Boolean,
default: false,
},
owner: {
type: SchemaTypes.ObjectId,
ref: 'user',
},
{ versionKey: false, timestamps: true }
)
```

## CRUD

| Method | Endpoints                     | Notes                         |
| ------ | ----------------------------- | ----------------------------- |
| POST   | /contacts                     | Add contact                   |
| GET    | /contacts                     | Get all contacts              |
| GET    | /contacts/:contactId          | Get single contact            |
| PUT    | /contacts/:contactId          | Update contact                |
| PATCH  | /contacts/:contactId/favorite | Update contact favorite field |
| DELETE | /contacts/:contactId          | Delete contact                |
| POST   | /users/signup                 | Registration of a new user    |
| POST   | /users/login                  | Login                         |
| POST   | /users/logout                 | Logout                        |
| GET    | /users/current                | Get user data by token        |
| PATCH  | /users/subscription           | Update user's subscription    |
| PATCH  | /users/avatars                | Update user's avatar          |
