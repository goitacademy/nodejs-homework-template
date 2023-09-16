const express = require("express");
const morgan = require("morgan"); /* протоколювання */
const cors = require("cors"); /* Перехресний обмін ресурсами */
const fs = require("fs"); /* для роботи з файлами */

function listContacts() {
    const data = fs.readFileSync("contacts.json"); /* бере потрібний файл */
    return JSON.parse(data);
};

const app = express();

app.use(morgan("combined")); /* вказую тип логування */
app.use(cors());
// Парсинг JSON-даних
app.use(express.json()); /* парсинг json-даних */

// Одноразово читаємо дані при запуску сервера
const contacts = listContacts();

// налаштування маршруту для отримання всіх контактів
/* app.get("/api/contacts", (req, res) => {
    res.json(contacts);
}); */

app.get("/api/contacts", (req, res) => {
    try {
        res.status(200).json(contacts); /* повертає дані у форматі JSON зі статусом 200 (OK) */
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" }); /* у разі помилки сервера (500) */
    };
});

module.exports = app