# Homework 003 [Express MongoDb Mongoose] - Done

## Added packages

- [<img height="75" src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" />
  dotenv](https://www.npmjs.com/package/dotenv) - from a .env file into process.env

- [![mongoose](https://mongoosejs.com//docs/images/mongoose5_62x30_transparent.png) mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js

---

## Added files

- model/schemas/schContacts.js - defines the shape of the documents in collection
- model/connection.js - create connection to DB instance and export (to server.js)

---

## Edited files

- model/index.js - now not a .json file is used, but a MongoDb
- bin/server.js - takes a connection instance and wraps the application in it

---

## Deleted

- contacts.json
