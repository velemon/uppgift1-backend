// db.js - Skapar en anslutning till MySQL-databasen och exporterar den
// Importera mysql2-biblioteket
const mysql = require("mysql2");
// Ladda miljövariabler från .env-filen
require("dotenv").config();

// Skapa en anslutning till MySQL-databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Anslut till MySQL-databasen
connection.connect((err) => {

    // Om det uppstår ett fel, logga det och annars logga att anslutningen lyckades 
    if (err) {
        console.log("Fel vid anslutning:", err);
    } else {
        console.log("Ansluten till databasen");
    }
});

// Exportera anslutningen så att den kan användas i andra filer 
module.exports = connection;