// routes.js - Definierar API-rutter för CRUD-operationer på arbetserfarenheter
// Importera express-biblioteket
const express = require("express");
// Skapa en router
const router = express.Router();
// Importera databasanslutningen
const db = require("../models/db");


// GET all
router.get("/", (req, res) => {
    // SQL-fråga för att hämta alla arbetserfarenheter
    const sql = "SELECT * FROM workexperience";

    // Kör SQL-frågan och hantera resultatet i en callback
    db.query(sql, (err, results) => {
        // Om det uppstår ett fel, returnera en 500-statuskod och felet som JSON
        if (err) {
            return res.status(500).json(err);
        }
        // Returnera resultaten som JSON med en 200-statuskod
        res.status(200).json(results);
    });
});


// GET by id
router.get("/:id", (req, res) => {
    // Hämta id från URL-parametrarna
    const id = req.params.id;
    // SQL-fråga för att hämta en arbetserfarenhet baserat på id
    const sql = "SELECT * FROM workexperience WHERE id=?";
    // Kör SQL-frågan med id som parameter och hantera resultatet i en callback
    db.query(sql, [id], (err, results) => {
        // Om det uppstår ett fel, returnera en 500-statuskod och felet som JSON
        if (err) {
            return res.status(500).json(err);
        }

        // Om inga resultat hittas, returnera en 404-statuskod och ett meddelande som JSON
        if (results.length === 0) {
            return res.status(404).json({
                message: "Ingen post hittades"
            });
        }
        // Returnera den första posten i resultaten som JSON med en 200-statuskod
        res.status(200).json(results[0]);
    });
});


// POST
// Definiera en POST-rutt för att skapa en ny arbetserfarenhet
router.post("/", (req, res) => {
    // Strukturera ut de nödvändiga fälten från request body
    const {
        companyname,
        jobtitle,
        location,
        startdate,
        enddate,
        description
    } = req.body;

    // Validera att alla obligatoriska fält är ifyllda, annars returnera en 400-statuskod och ett meddelande som JSON
    if (
        !companyname ||
        !jobtitle ||
        !location ||
        !startdate ||
        !description
    ) {
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    // SQL-fråga för att infoga en ny arbetserfarenhet i databasen
    const sql = `
        INSERT INTO workexperience
        (
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Kör SQL-frågan med de strukturerade fälten som parametrar och hantera resultatet i en callback
    db.query(
        sql,
        [
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description
        ],
        (err, result) => {
            // Om det uppstår ett fel, returnera en 500-statuskod och felet som JSON
            if (err) {
                return res.status(500).json(err);
            }

            // Returnera ett meddelande och det nya id:t som JSON med en 201-statuskod
            res.status(201).json({
                message: "Post skapad",
                id: result.insertId
            });
        }
    );
});


// PUT
// Definiera en PUT-rutt för att uppdatera en befintlig arbetserfarenhet baserat på id  
router.put("/:id", (req, res) => {
    // Hämta id från URL-parametrarna
    const id = req.params.id;

    // Strukturera ut de nödvändiga fälten från request body
    const {
        companyname,
        jobtitle,
        location,
        startdate,
        enddate,
        description
    } = req.body;

    // Validera att alla obligatoriska fält är ifyllda, annars returnera en 400-statuskod och ett meddelande som JSON
    if (
        !companyname ||
        !jobtitle ||
        !location ||
        !startdate ||
        !description
    ) {
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    // SQL-fråga för att uppdatera en befintlig arbetserfarenhet i databasen baserat på id
    const sql = `
        UPDATE workexperience
        SET
        companyname=?,
        jobtitle=?,
        location=?,
        startdate=?,
        enddate=?,
        description=?
        WHERE id=?
    `;

    // Kör SQL-frågan med de strukturerade fälten och id som parametrar och hantera resultatet i en callback
    db.query(
        sql,
        [
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description,
            id
        ],
        (err) => {

            // Om det uppstår ett fel, returnera en 500-statuskod och felet som JSON
            if (err) {
                return res.status(500).json(err);
            }
            // Returnera ett meddelande som JSON med en 200-statuskod
            res.status(200).json({
                message: "Post uppdaterad"
            });
        }
    );
});


// DELETE
// Definiera en DELETE-rutt för att radera en befintlig arbetserfarenhet baserat på id
router.delete("/:id", (req, res) => {

    // Hämta id från URL-parametrarna
    const id = req.params.id;
    // SQL-fråga för att radera en befintlig arbetserfarenhet i databasen baserat på id
    const sql = "DELETE FROM workexperience WHERE id=?";

    // Kör SQL-frågan med id som parameter och hantera resultatet i en callback
    db.query(sql, [id], (err) => {
        // Om det uppstår ett fel, returnera en 500-statuskod och felet som JSON
        if (err) {
            return res.status(500).json(err);
        }

        // Returnera ett meddelande som JSON med en 200-statuskod
        res.status(200).json({
            message: "Post raderad"
        });
    });
});

// Exportera routern så att den kan användas i andra filer
module.exports = router;