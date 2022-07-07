## CONTACTS API 
Our resource allows you to create and store information about a person (name, е-mail address, phone number) in the contact book, using the[ Mongo database](https://cloud.mongodb.com/v2/62b196f45bfd3b47555aa300#metrics/replicaSet/62b1992510e61d3eefb643c1/explorer/db-contacts/contacts/find)

### Available methods
* ```GET /contacts``` &mdash; method to get a list of all contacts
* ```GET /contacts/{contactId}``` &mdash; method to get the right contact by id
* ```POST /contacts``` &mdash; method for adding a new contact to the list
* ```PUT /contacts/{contactId}``` &mdash; method for finding a contact by id and changing it 
* ```PATCH /contacts/{contactID}/favorite``` &mdash; method for updating the status of a favorite contact by id
* ```DELETE /contacts/{contactId}``` &mdash; method to remove a contact from the list by id

### Contacts

They're identified by their ids, which are unique integers, and live under ```/api/contacts/<contactId>```.
All items have some of the following properties:
field|description
:---: |:----------
**id**|```string```  the contact's unique id.[^1]
**name**|```string``` contact name must contain only a-z, A-Z and 0-9 (***required field***)
**email**|```string``` must be a valid contact email address such as nick@mail.com
**phone**|```string``` the phone number should look like this *+38(044)555-55-55*
**favorite**|```boolean``` property can be either *true* - added to favorites, or *false* - not added
**createdAt**|```string``` date and time when the contact was created[^1] 
**updatedAt**|```string``` date and time when the contact was updated[^1]
[^1]:generated automatically by the database

