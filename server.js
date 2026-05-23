// Importera nödvändiga moduler: express för att skapa en webbserver och cors för att hantera CORS (Cross-Origin Resource Sharing)
const express = require("express");
const cors = require("cors");

// Ladda miljövariabler från .env-filen
require("dotenv").config();

// Skapa en Express-applikation
const app = express();
// Definiera porten som servern ska lyssna på till 3000
const port = process.env.PORT || 3000;

// Importera routern för arbetserfarenheter
const workexperienceRoutes = require("./routes/routes");

// Middleware - Använd express.json() för att kunna parsa JSON i request body och cors() för att hantera CORS
app.use(express.json());
// Använd cors-middleware för att tillåta cross-origin requests
app.use(cors()); 

// Routes - Använd de definierade rutterna
app.use("/api/workexperience", workexperienceRoutes);

// Starta server och lyssna på den angivna porten
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});