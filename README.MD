# $$\colorbox{green}{{\color{white}{GOIT-72\ Node\ js\ Rest \ Api}}}$$ 
#### $$\colorbox{teal}{{\color{white}{-- Rest Api Contacts Back end --}}}$$

[![Deployed At| ](https://i.ibb.co/zG6DGXq/render-logo-818-C47-ACCA-seeklogo-com.png)](https://nodejs-restapi-g9eb.onrender.com/api/contacts)  &ensp;   &ensp; $$\colorbox{lightblue}{{\color{black}{ @ DEPLOY}}}$$ 
[![Repository](https://i.ibb.co/j3TLp8G/github-logo-vector.png)](https://github.com/NovicovMykhailo/nodejs-homework-RestApi.git) &ensp; &ensp;$$\colorbox{lightblue}{{\color{black}{ @ SOURCE }}}$$ 

### Contacts Api with MongoDb implementation



__this API allows you__ :
- Add Contact
- View all contacts
- Modify contact
- Delete contact

# Basec Methods
 

### Base Url   [link](https://nodejs-restapi-g9eb.onrender.com/api/contacts)

| Method    | LINK    | Description   | Return |
| :---      |  :----  |          ---: |   ---:|
| **GET**  | [/](https://nodejs-restapi-g9eb.onrender.com/api/contacts) | Path to get all contacts | All Contacts
| **POST** | [/](https://nodejs-restapi-g9eb.onrender.com/api/contacts) | Path to add contact to DB | New Contact
| **GET** | [/:id](https://nodejs-restapi-g9eb.onrender.com/api/contacts?:id) | Path to get contact by ID | Found Contact
| **DELETE** | [/:id](https://nodejs-restapi-g9eb.onrender.com/api/contacts/:id)  | Path to delete Contact by ID | Message
| **PUT** | [/:id](https://nodejs-restapi-g9eb.onrender.com/api/contacts/:id)  | Update Contact by ID | Modified Contact
| **PATCH** | [/:id/favorite](https://nodejs-restapi-g9eb.onrender.com/api/contacts/:id/favorite) | path to change favorite |  Modified Contact


## Contact Example
```js
{
  "_id": "64b7b9aad289e12fb931d33c", //generating by Back End
  "name": "Allen Raymond", // String Required
  "email": "nulla.ante@vestibul.co.uk", // String Required
  "phone": "(992) 914-3792", // String Required
  "favorite": false // auto added but can modify
}
```


