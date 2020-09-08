Create a backed part for a service, which allows clients to manage
Documents and Managers, who work on this Documents. All data
have to be stored in postgres database.
Manager instance has:
- id;
- full name;

Document instance has:
- id;
- managerId - if of manager, who works on this document. Can be null;
- content - string;

All crud operations for both instances have to be provided.
Also you need to add logic which assigns document by id to 
some manager by id.

AC:

1. As a client i want to be able to create, read, update and delete Manager record.
2. As a client i want to be able to create, read, update and delete Document record.
3. As i client i want to be able to assign some document to a specific Manager.