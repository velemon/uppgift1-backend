// install.js - Skapar databas och tabell för arbetserfarenheter
// Importera mysql2-biblioteket
const mysql = require("mysql2");
// Ladda miljövariabler från .env-filen
require("dotenv").config();

// Skapa en anslutning till MySQL-servern
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Anslut till MySQL-servern
connection.query(
    `CREATE DATABASE IF NOT EXISTS cv`,
    (err) => {
        // Om det uppstår ett fel, kasta det
        if (err) throw err;

        console.log("Databas skapad");
        // Byt till den nya databasen
        connection.changeUser(
            { database: "cv" },
            (err) => {
                // Om det uppstår ett fel, kasta det
                if (err) throw err;

                // Skapa tabellen för arbetserfarenheter
                const sql = `
                    CREATE TABLE IF NOT EXISTS workexperience (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        companyname VARCHAR(255) NOT NULL,
                        jobtitle VARCHAR(255) NOT NULL,
                        location VARCHAR(255) NOT NULL,
                        startdate DATE NOT NULL,
                        enddate DATE,
                        description TEXT NOT NULL
                    )
                `;
                // Kör SQL-frågan för att skapa tabellen
                connection.query(sql, (err) => {
                    // Om det uppstår ett fel, kasta det
                    if (err) throw err;

                    // Stäng anslutningen till MySQL-servern
                    console.log("Tabell skapad");
                    process.exit();
                });
            }
        );
    }
);