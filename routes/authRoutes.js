// Routes för auth.
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// Ansluter till MongoDB-databasen.
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE)
// Lyckad anslutning.
.then(() => { 
    console.log("Ansluten till databasen!");})
// Fel vid anslutning.
.catch((error) => {
    console.error("Fel vid anslutning till databasen...");
});

// Importerar användarmodellen.
const User = require("../models/user");

// Skapar/registrerar en ny användare.
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar input.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Korrekt input? Skapar en användare.
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ 
            message: "Användarkontot är registrerat!",
            newUser: username 
        });

    // Felmeddelande.
    } catch (error) {
        res.status(500).json({ error: "Serverfel..." });
    }
});

// Loggar in användaren.
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar input.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Kontrollerar inloggningsuppgifter.
        if(username === "Jenny" && password === "password") {
            res.status(200).json({ message: "Lyckad inloggning!" });
        } else {
            res.status(401).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

    // Felmeddelande.
    } catch (error) {
        res.status(500).json({ error: "Serverfel..." });
    }
});

// Exporterar koden till server.js.
module.exports = router;