# goit-node-hw-01

Node.js project to manage contacts using API.

## General info

With this program you can manage contacts using http. View all or, add, edit or delete

## Technologies

Used technologies:

- Node.js,
- express,
- morgan,
- cors,
- nanoid.

## GH of project

You are here but here is a link:
[https://mattmalicki.github.io/goit-node-hw-02/]

## Install and run

### Install all dependencies:

```shell
npm install
```

### Run project in your localhost:

```shell
npm start
```

### API:

#### @ GET /api/contacts

Get all contacts.

#### @ GET /api/contacts/:id

Get specific contact using id.

#### @ POST /api/contacts

Add contact.
With object in body that contains name, email and phone, create new contact.
All keys are required.

#### @ DELETE /api/contacts/:id

Delete specific contact using id.

#### @ PUT /api/contacts/:id

Change specific contact.
Params required id. And in body required is object that contains at least one of: name, email, phone.
