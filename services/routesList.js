//---------------------------routes-------------------------------
//! ------------------ auth -----------------------
// POST -->   http://localhost:3000/api/users/signup
// POST -->   http://localhost:3000/api/users/login
// GET  -->   http://localhost:3000/api/users/logout
// GET  -->   http://localhost:3000/api/users/current
// PATCH -- > http://localhost:3000/api/users

//  Headers --> Authorization -->
//  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FiNGQzOTFiMmMxNDJjOGY2OTM1YjIiLCJlbWFpbCI6IjU1NUB1a3IubmV0IiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0yN1QxOTo1MzoyOS42MjJaIiwiaWF0IjoxNjcyMzM4ODk2fQ.OF7nTx66ljHbC90VfIGsXGxwLK3ulHIrF104g55g7bA


//* ------------------ contacts ------------------
//! http://localhost:3000/api/contacts
//  http://localhost:3000/api/contacts/id
//  http://localhost:3000/api/contacts/id/favorite
//* http://localhost:3000/api/contacts?skip=0&limit=4
//? http://localhost:3000/api/contacts?skip=1&limit=1

//  http://localhost:3000/api/contacts?skip=0&limit=2&favorite=true
//  http://localhost:3000/api/contacts?skip=0&limit=2&sortField=favorite
//  http://localhost:3000/api/contacts?skip=0&limit=2&sortField=favorite&sortOrder=DESC

//* Доп. задание-2: Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
//  http://localhost:3000/api/contacts?favorite=true